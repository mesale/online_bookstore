package com.bookstore.paymentservice.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class PaymentDto {

    public record CheckoutResponse(
            UUID orderId,
            UUID transactionId,
            String stripeClientSecret,
            BigDecimal amount
    ) {}

    public record TransactionResponse(
            UUID id,
            UUID orderId,
            UUID storeId,
            UUID branchId,
            BigDecimal amount,
            BigDecimal commissionRate,
            BigDecimal commissionAmount,
            BigDecimal netAmount,
            String stripePaymentIntentId,
            String status,
            LocalDateTime createdAt
    ) {}

    public record PayoutResponse(
            UUID id,
            UUID transactionId,
            UUID storeId,
            BigDecimal amount,
            String stripeTransferId,
            String status,
            LocalDateTime createdAt
    ) {}
}
