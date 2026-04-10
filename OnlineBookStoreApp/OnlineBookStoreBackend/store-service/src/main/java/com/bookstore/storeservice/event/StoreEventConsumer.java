package com.bookstore.storeservice.event;

import com.bookstore.storeservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class StoreEventConsumer {

    private final StoreService storeService;

    @KafkaListener(topics = KafkaTopics.STORE_APPLICATION_APPROVED, groupId = "store-service"
    )
    public void handleStoreApplicationApproved(StoreApplicationApprovedEvent event){
        log.info("Received StoreApplicationApprovedEvent for applicationId: {}", event.getApplicationId());

        try{
            storeService.createStoreFormApprovedApplication(event);
        } catch (Exception e){
            log.error("Failed to Process StoreApplicationApprovedEvent for applicationId: {}", event.getApplicationId(), e);
        }

    }

    @KafkaListener(topics = KafkaTopics.STRIPE_ACCOUNT_CREATED, groupId = "store-service")
    public void handleStripeAccountCreated(StripeAccountCreatedEvent event){
        log.info("Received StripeAccountCreatedEvent for storeId: {}", event.getStoreId());

        try {
            storeService.handleStripeAccountCreated(event);
        }catch (Exception e){
            log.error("Failed to process StripeAccountCreatedEvent for storeId: {}", event.getStoreId(), e);
        }
    }

}
