package com.bookstore.userservice.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class StoreEventPublisher {

    private  final KafkaTemplate<String, StoreApplicationApprovedEvent> kafkaTemplate;

    public void publishStoreApplicationApproved(StoreApplicationApprovedEvent event){
        kafkaTemplate.send(KafkaTopics.STORE_APPLICATION_APPROVED,
                event.getApplicationId().toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex != null)
                        log.error("Failed to publish StoreApplicationApprovedEvent for applicationId: {}",
                                event.getApplicationId(), ex);
                    else
                        log.info("Published StoreApplicationApprovedEvent for applicationId: {}",
                                event.getApplicationId());
                });
    }

}
