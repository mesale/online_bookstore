package com.bookstore.userservice.event;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class KafkaTopics {

    public static final String STORE_APPLICATION_APPROVED = "store-application-approved";
    public static final String CREATE_STORE_OWNER = "create-store-owner";

}
