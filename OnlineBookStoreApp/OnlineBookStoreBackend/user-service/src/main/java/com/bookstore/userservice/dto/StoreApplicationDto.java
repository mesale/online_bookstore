package com.bookstore.userservice.dto;

import com.bookstore.userservice.entity.StoreApplication;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.UUID;

public class StoreApplicationDto {

    public record SubmitApplicationRequest(
            @NotBlank(message = "business email is required")
            @Email(message = "invalid email")
            String businessEmail
    ){}

    public record StoreApplicationResponse(
            UUID id,
            UUID userId,
            String businessEmail,
            StoreApplication.Status status,
            String rejectionReason,
            LocalDateTime submittedAt,
            LocalDateTime reviewedAt
    ){}

}
