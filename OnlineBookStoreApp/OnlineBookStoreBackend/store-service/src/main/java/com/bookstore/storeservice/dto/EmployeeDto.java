package com.bookstore.storeservice.dto;

import com.bookstore.storeservice.entity.Employee;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.UUID;

public class EmployeeDto {

    public record InviteEmployeeRequest(

            @NotBlank(message = "Name is required")
            String name,

            @NotBlank(message = "Email is required")
            @Email(message = "Invalid email address")
            String email,

            @NotNull(message = "Role is required")
            Employee.Role role,

            @NotBlank(message = "Password is required")
            @Size(min = 8, message = "Password must be at least 8 characters")
            String password
    ) {}

    public record EmployeeResponse(
            UUID id,
            String keycloakId,
            UUID storeId,
            UUID branchId,
            String name,
            String email,
            String role,
            LocalDateTime createdAt
    ) {}
}
