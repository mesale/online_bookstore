package com.bookstore.storeservice.controller;

import com.bookstore.storeservice.dto.ApiResponse;
import com.bookstore.storeservice.dto.StoreDto.*;
import com.bookstore.storeservice.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @PutMapping(value = "/me/complete-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<StoreResponse>> completeProfile(
            @AuthenticationPrincipal Jwt jwt,
            @RequestPart("data") @Valid CompleteStoreProfileRequest request,
            @RequestPart("ownerIdFile") MultipartFile ownerIdFile,
            @RequestPart("businessLicenseFile") MultipartFile businessLicenseFile
    ) {
        System.out.println("JWT claims: " + jwt.getClaims());

        UUID storeId = UUID.fromString(jwt.getClaimAsString("store_id"));

        StoreResponse response = storeService.completeProfile(
                storeId, request, ownerIdFile, businessLicenseFile);

        return ResponseEntity.ok(ApiResponse.ok("Profile completed successfully", response));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<StoreResponse>> getMyStore(@AuthenticationPrincipal Jwt jwt){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

        StoreResponse response = storeService.getMyStore(storeId);

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

        UUID storeId = UUID.fromString(jwt.getClaim("storeId"));

        StoreResponse response = storeService.updateStore(storeId, request);

        return ResponseEntity.ok(ApiResponse.ok("Store updated successfully", response));

    }

}
