package com.bookstore.paymentservice.conttroller;

import com.bookstore.paymentservice.config.StripeConfig;
import com.bookstore.paymentservice.dto.ApiResponse;
import com.bookstore.paymentservice.service.PaymentService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments/webhook")
@Slf4j
public class StripeWebhookController {

    private final PaymentService paymentService;
    private final StripeConfig stripeConfig;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> handleWebhook(
            @RequestBody byte[] payload,
            @RequestHeader("Stripe-Signature") String sigHeader){

        Event event;

        try {
            event = Webhook.constructEvent(
                    new String(payload, StandardCharsets.UTF_8),
                    sigHeader,
                    stripeConfig.getWebhookSecret());
        } catch(SignatureVerificationException e) {
            log.warn("Invalid stripe webhook signature" + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.ok("Invalid signature"));
        }

        if("payment_intent.succeeded".equals(event.getType())) {

            log.info("Handling payment_intent.succeeded");

            var deserializer = event.getDataObjectDeserializer();

            if (deserializer.getObject().isPresent()) {
                PaymentIntent paymentIntent = (PaymentIntent) deserializer.getObject().get();
                log.info("Payment intent succeeded: {}", paymentIntent.getId());
                paymentService.handleStripeWebhook(paymentIntent.getId());
            } else {

                log.warn("Deserializer returned empty, trying raw JSON fallback");
                try {
                    PaymentIntent paymentIntent = (PaymentIntent) deserializer.deserializeUnsafe();
                    log.info("Payment intent succeeded (fallback): {}", paymentIntent.getId());
                    paymentService.handleStripeWebhook(paymentIntent.getId());
                } catch (Exception e) {
                    log.error("Failed to deserialize PaymentIntent: {}", e.getMessage());
                }
            }


        }

        else
            log.info("Unhandled stripe event type: {}, length: {}", event.getType(), event.getType().length());

        return ResponseEntity.ok(ApiResponse.ok("Received"));

    }

}
