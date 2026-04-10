package com.bookstore.paymentservice.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPaymentCompletes(PaymentCompletedEvent event){

        kafkaTemplate.send(KafkaTopics.PAYMENT_COMPLETED,
                event.getOrderId().toString(), event)
                .whenComplete((result, ex) ->{
                    if (ex != null)
                        log.error("Failed to publish PaymentCompletedEvent for orderId: {}", event.getOrderId());
                    else
                        log.info("Published PaymentCompleted Event for orderId: {}", event.getOrderId());
                });

    }

    public void publishStripeAccountCreated(StripeAccountCreatedEvent event) {
        kafkaTemplate.send(KafkaTopics.STRIPE_ACCOUNT_CREATED,
                        event.getStoreId().toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        log.error("Failed to publish StripeAccountCreatedEvent for storeId: {}",
                                event.getStoreId(), ex);
                    } else {
                        log.info("Published StripeAccountCreatedEvent for storeId: {}",
                                event.getStoreId());
                    }
                });
    }

}
