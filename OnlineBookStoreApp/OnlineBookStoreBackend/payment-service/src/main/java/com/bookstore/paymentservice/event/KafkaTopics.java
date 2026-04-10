package com.bookstore.paymentservice.event;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public final class KafkaTopics {

    public final static String ORDER_CREATED = "order-created";
    public final static String PAYMENT_COMPLETED = "payment-completed";
    public final static String DELIVERY_CONFIRMED = "delivery-confirmed";
    public static final String STORE_CREATED = "store-created";
    public static final String STRIPE_ACCOUNT_CREATED = "stripe-account-created";

}
