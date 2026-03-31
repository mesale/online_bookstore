package com.bookstore.orderservice.controller;

import com.bookstore.orderservice.dto.ApiResponse;
import com.bookstore.orderservice.dto.OrderDto.*;
import com.bookstore.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/api/branch/orders")
@RequiredArgsConstructor
public class BranchOrderController {

    private final OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('STORE_ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<ApiResponse<List<OrderSummaryResponse>>> getBranchOrders(
            @AuthenticationPrincipal Jwt jwt
            ){

        UUID branchId = UUID.fromString(jwt.getClaim("branch_id"));

        List<OrderSummaryResponse> response = orderService.getBranchOrders(branchId);

        return ResponseEntity.ok(ApiResponse.ok(response));

    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('STORE_ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<ApiResponse<List<OrderSummaryResponse>>> getPendingOrders(@AuthenticationPrincipal Jwt jwt){

        UUID branchId = UUID.fromString(jwt.getClaim("branch_id"));

        List<OrderSummaryResponse> response = orderService.getPendingBranchOrders(branchId);

        return ResponseEntity.ok(ApiResponse.ok(response));

    }

    @PostMapping("/confirm-delivery")
    @PreAuthorize("hasRole('STORE_ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<ApiResponse<OrderResponse>> confirmDelivery(
            @AuthenticationPrincipal Jwt jwt,
            ConfirmDeliveryRequest request
    ){

        UUID branchId = UUID.fromString(jwt.getClaim("branch_id"));
        OrderResponse response = orderService.confirmDelivery(branchId, request);

        return ResponseEntity.ok(ApiResponse.ok("Delivery Confirmed successfully", response));

    }

}
