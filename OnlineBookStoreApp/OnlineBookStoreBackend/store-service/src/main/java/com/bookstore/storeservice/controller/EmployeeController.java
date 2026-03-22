package com.bookstore.storeservice.controller;

import com.bookstore.storeservice.dto.ApiResponse;
import com.bookstore.storeservice.dto.EmployeeDto.*;
import com.bookstore.storeservice.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/me/branchs/{branchId}/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<EmployeeResponse>> inviteEmployee(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID branchId,
            @Valid @RequestBody InviteEmployeeRequest request
    ){

        EmployeeResponse response = employeeService.inviteEmployee(jwt.getSubject(), branchId, request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Employee created successfully", response));

    }

}
