package com.bookstore.storeservice.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class StoreEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishStoreCreated(StoreCreatedEvent event){

        kafkaTemplate.send(KafkaTopics.STORE_CREATED,
                event.getStoreId().toString(), event)
                .whenComplete((result, ex) ->{
                    if (ex != null)
                        log.error("Failed to publish StoreCreatedEvent for orderId: {}", event.getStoreId(), ex);
                    else
                        log.info("Published StoreCreatedEvent for storeId: {}", event.getStoreId());
                });

    }

}
