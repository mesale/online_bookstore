package com.bookstore.paymentservice.service;

import com.bookstore.paymentservice.dto.PaymentDto.*;
import com.bookstore.paymentservice.entity.Payout;
import com.bookstore.paymentservice.entity.Transaction;
import com.bookstore.paymentservice.event.*;
import com.bookstore.paymentservice.exception.PaymentException;
import com.bookstore.paymentservice.exception.ResourceNotFoundException;
import com.bookstore.paymentservice.repository.PayoutRepository;
import com.bookstore.paymentservice.repository.TransactionRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Transfer;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.TransferCreateParams;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final TransactionRepository transactionRepository;
    private final PayoutRepository payoutRepository;
    private final PaymentEventPublisher paymentEventPublisher;
    private final EmailService emailService;

    private static final BigDecimal FREE_COMMISSION = new BigDecimal("0.5");
    private static final BigDecimal PREMIUM_COMMISSION = new BigDecimal("0.2");

    public void handleStoreCreated  (StoreCreatedEvent event){

        try{
            AccountCreateParams params  = AccountCreateParams.builder()
                    .setType(AccountCreateParams.Type.EXPRESS)
                    .setCountry("US")
                    .setEmail(event.getBusinessEmail())
                    .setCapabilities(
                            AccountCreateParams.Capabilities.builder()
                                    .setTransfers(
                                            AccountCreateParams.Capabilities.Transfers.builder()
                                                    .setRequested(true)
                                                    .build()).
                                    build())
                    .putMetadata("store_id", event.getStoreId().toString())
                    .putMetadata("store_name", event.getStoreName())
                    .build();

            Account account = Account.create(params);

            AccountLinkCreateParams linkParams = AccountLinkCreateParams.builder()
                    .setAccount(account.getId())
                    .setRefreshUrl("https://localhost:3000/onbording/retry") // Where to go if the link expires
                    .setReturnUrl("https://localhost:3000/onbording/completed") // Where to go after they finish
                    .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
                    .build();

            AccountLink accountLink = AccountLink.create(linkParams);

            String onboardingUrl = accountLink.getUrl();

            log.info("Stripe connect account created for storeId: {}", event.getStoreId());
            log.info("Send this to the user to finish setup: {}", onboardingUrl);
            emailService.sendStripeOnboardingEmail(event.getBusinessEmail(), event.getStoreName(), onboardingUrl);

            paymentEventPublisher.publishStripeAccountCreated(
                    new StripeAccountCreatedEvent(
                            event.getStoreId(),
                            account.getId()
                    )
            );

        }catch(StripeException e){
            log.error("Failed to create stripe account for storeId: {}", event.getStoreId());
        }

    }

    @Transactional
    public void handleOrderCreated(OrderCreatedEvent event){

        transactionRepository.findByOrderId(event.getOrderId())
                .ifPresent( t -> {
                    log.warn("Transaction already exists for orderId: {}", event.getStoreId());
                    return;
                });

        BigDecimal commissionAmount = event.getTotalPrice().multiply(FREE_COMMISSION);

        BigDecimal netAmount = event.getTotalPrice().subtract(commissionAmount);

        Transaction transaction =Transaction.builder()
                .orderId(event.getOrderId())
                .buyerKeycloakId(event.getBuyerKeycloakId())
                .branchId(event.getBranchId())
                .storeId(event.getStoreId())
                .amount(event.getTotalPrice())
                .commissionRate(FREE_COMMISSION)
                .commissionAmount(commissionAmount)
                .netAmount(netAmount)
                .status(Transaction.TransactionStatus.PENDING)
                .build();

        transactionRepository.save(transaction);
        log.info("Transaction created for orderId: {}", event.getOrderId());

    }

    @Transactional
    public void handleDeliveryConfirmed(DeliveryConfirmedEvent event){

        Transaction transaction = transactionRepository.findByOrderId(event.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found for orderId: " + event.getOrderId()));

        try{
                log.info("Releasing {} to storeId: {} for orderId: {}", event.getAmountToRelease(), event.getStoreId(), event.getOrderId());

                long amountInCents = event.getAmountToRelease()
                        .multiply(new BigDecimal("100"))
                        .longValue();

            TransferCreateParams transferParams = TransferCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("USD")
                    .setDestination(event.getStripeAccountId())
                    .putMetadata("order_id", event.getOrderId().toString())
                    .putMetadata("store_id", event.getStoreId().toString())
                    .build();

            Transfer transfer = Transfer.create(transferParams);

            log.info("Stripe transfer created: {} for orderId: {}",
                    transfer.getId(), event.getOrderId());

                transaction.setStatus(Transaction.TransactionStatus.RELEASED);
                transaction.setStripeAccountId(event.getStripeAccountId());
                transactionRepository.save(transaction);

                Payout payout = Payout.builder()
                        .transaction(transaction)
                        .storeId(event.getStoreId())
                        .amount(event.getAmountToRelease())
                        .stripeTransferId(transfer.getId())
                        .stripeAccountId(event.getStripeAccountId())
                        .status(Payout.PayoutStatus.COMPLETED)
                        .build();

                payoutRepository.save(payout);
                log.info("Payout Recorded for orderId: {}", event.getOrderId());
        }catch (Exception ex){
            log.error("Failed to release funds for orderId: {}", event.getOrderId(), ex);

            Payout failedPayout = Payout.builder()
                    .transaction(transaction)
                    .storeId(event.getStoreId())
                    .amount(event.getAmountToRelease())
                    .stripeAccountId(event.getStripeAccountId())
                    .status(Payout.PayoutStatus.FAILED)
                    .build();

            payoutRepository.save(failedPayout);

        }

    }

    @Transactional
    public CheckoutResponse createCheckoutSession(UUID orderId, String buyerKeycloakId){

        Transaction transaction = transactionRepository.findByOrderIdAndBuyerKeycloakId(orderId, buyerKeycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found for orderId: " + orderId));

        if (transaction.getStatus() != Transaction.TransactionStatus.PENDING)
            throw new PaymentException("Payment already initiated for this order");

        try{
            long amountInCents = transaction.getAmount()
                    .multiply(new BigDecimal("100"))
                    .longValue();

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("USD")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .setAllowRedirects(
                                            PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER)
                                    .build()
                    )
                    .putMetadata("order_id", orderId.toString())
                    .putMetadata("transaction_id", transaction.getId().toString())
                    .build();


            PaymentIntent paymentIntent = PaymentIntent.create(params);

            transaction.setStripePaymentIntentId(paymentIntent.getId());
            transaction.setStatus(Transaction.TransactionStatus.HELD);
            transactionRepository.save(transaction);

            return new CheckoutResponse(
                    orderId,
                    transaction.getId(),
                    paymentIntent.getClientSecret(),
                    transaction.getAmount()
            );
        }catch (Exception ex){
            log.error("Stripe error when creating PaymentIntent for orderId: {}", orderId, ex);
            throw new PaymentException("Failed to initiate payment for orderID: " + ex.getMessage());
        }

    }

    @Transactional
    public void handleStripeWebhook(String stripePaymentIntentId){

        Transaction transaction = transactionRepository.findByStripePaymentIntentId(stripePaymentIntentId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found for payment intent " + stripePaymentIntentId));

        transaction.setStatus(Transaction.TransactionStatus.HELD);
        transactionRepository.save(transaction);

        paymentEventPublisher.publishPaymentCompletes(new PaymentCompletedEvent(
                transaction.getOrderId(),
                stripePaymentIntentId,
                transaction.getAmount()
        ));

        log.info("Payment confirmed for orderId: {}", transaction.getOrderId());

    }

    public List<TransactionResponse> getStoreTransactions(UUID storeId){
        return transactionRepository.findByStoreId(storeId)
                .stream()
                .map(this::toTransactionResponse)
                .toList();
    }

    public List<PayoutResponse> getStorePayouts(UUID storeId){

        return payoutRepository.findByStoreId(storeId)
                .stream()
                .map(this::toPayoutResponse)
                .toList();

    }

    public List<TransactionResponse> getAllTransactions(){

        return transactionRepository.findAll()
                .stream()
                .map(this::toTransactionResponse)
                .toList();

    }

    private TransactionResponse toTransactionResponse(Transaction t) {
        return new TransactionResponse(
                t.getId(),
                t.getOrderId(),
                t.getStoreId(),
                t.getBranchId(),
                t.getAmount(),
                t.getCommissionRate(),
                t.getCommissionAmount(),
                t.getNetAmount(),
                t.getStripePaymentIntentId(),
                t.getStatus().name(),
                t.getCreatedAt()
        );
    }

    private PayoutResponse toPayoutResponse(Payout p) {
        return new PayoutResponse(
                p.getId(),
                p.getTransaction().getId(),
                p.getStoreId(),
                p.getAmount(),
                p.getStripeTransferId(),
                p.getStatus().name(),
                p.getCreatedAt()
        );
    }
}


