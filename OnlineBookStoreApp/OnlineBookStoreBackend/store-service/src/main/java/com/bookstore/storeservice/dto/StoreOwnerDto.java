package com.bookstore.storeservice.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class StoreOwnerDto {

    public record StoreOwnerResponse(
            UUID id,
            String keycloakId,
            UUID storeId,
            String name,
            String email,
            String phone,
            LocalDateTime createdAt
    ) {}
}
