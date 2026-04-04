package com.bookstore.paymentservice.conttroller;

import com.bookstore.paymentservice.dto.ApiResponse;
import com.bookstore.paymentservice.dto.PaymentDto.*;
import com.bookstore.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/payments")
public class StorePaymentController {

    private final PaymentService paymentService;

    @GetMapping("/transactions")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getStoreTransactions(@AuthenticationPrincipal Jwt jwt){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

        List<TransactionResponse> response = paymentService.getStoreTransactions(storeId);

        return ResponseEntity.ok(ApiResponse.ok(response));

    }

    @GetMapping("/payouts")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<List<PayoutResponse>>> getStorePayouts(@AuthenticationPrincipal Jwt jwt){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

        List<PayoutResponse> response = paymentService.getStorePayouts(storeId);

        return ResponseEntity.ok(ApiResponse.ok(response));

    }



}
