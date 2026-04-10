package com.bookstore.storeservice.controller;

import com.bookstore.storeservice.dto.ApiResponse;
import com.bookstore.storeservice.dto.StoreDto.*;
import com.bookstore.storeservice.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<StoreResponse>> getMyStore(@AuthenticationPrincipal Jwt jwt){

        StoreResponse response = storeService.getMyStore(jwt.getSubject());

        return ResponseEntity.ok(ApiResponse.ok(response));

    }

    @GetMapping("/{storeId}/stripe-account")
    @PreAuthorize("hasRole('STORE_ADMIN') or hasRole('EMPLOYEE') or hasRole('USER')")
    public ResponseEntity<ApiResponse<String>> getStripeAccountId(
            @PathVariable UUID storeId
    ){
        String stripeAccountId = storeService.getStripeAccountId(storeId);

        return ResponseEntity.ok(ApiResponse.ok(stripeAccountId));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<StoreResponse>> updateMyStore(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateStoreRequest request
    ){

        StoreResponse response = storeService.updateStore(jwt.getSubject(), request);

        return ResponseEntity.ok(ApiResponse.ok("Store updated successfully", response));

    }

}
