package com.bookstore.storeservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.UUID;

public class StoreDto {

    public record CompleteStoreProfileRequest(

            @NotBlank(message = "Store name is required")
            String storeName,

            @NotBlank(message = "Business registration number is required")
            String businessRegNumber,

            @NotBlank(message = "TIN is required")
            String tin,

            @NotBlank(message = "Region is required")
            String region,

            @NotBlank(message = "City is required")
            String city,

            @NotBlank(message = "Address is required")
            String address,

            String bankName,
            String bankAccount
    ){}

    public record RejectStoreRequest(
            @NotBlank(message = "Rejection reason is required")
            String reason
    ) {}

    public record StoreResponse(
            UUID id,
            String storeName,
            String businessRegNumber,
            String tin,
            String region,
            String city,
            String address,
            String email,
            String phone,
            String bankName,
            String bankAccount,
            String plan,
            String verificationStatus,
            String rejectionReason,
            LocalDateTime createdAt
    ) {}

    public record UpdateStoreRequest(

            @NotBlank(message = "Store name is required")
            String storeName,

            @NotBlank(message = "Region is required")
            String region,

            @NotBlank(message = "City is required")
            String city,

            @NotBlank(message = "Address is required")
            String address,

            String phone,
            String bankName,
            String bankAccount
    ) {}

}
