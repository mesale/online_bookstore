package com.bookstore.storeservice.event;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class KafkaTopics {

    public static final String STORE_APPLICATION_APPROVED = "store-application-approved";
    public static final String STORE_CREATED = "store-created";
    public static final String STRIPE_ACCOUNT_CREATED = "stripe-account-created";
    public static final String CREATE_STORE_OWNER = "create-store-owner";

}
