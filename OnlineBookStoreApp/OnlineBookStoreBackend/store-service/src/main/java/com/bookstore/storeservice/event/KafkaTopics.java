package com.bookstore.storeservice.event;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class KafkaTopics {

    public static final String STORE_APPLICATION_APPROVED = "store-application-approved";

}
