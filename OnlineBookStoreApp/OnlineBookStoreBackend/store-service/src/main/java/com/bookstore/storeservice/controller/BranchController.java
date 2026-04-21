package com.bookstore.storeservice.controller;

import com.bookstore.storeservice.dto.ApiResponse;
import com.bookstore.storeservice.dto.BranchDto.*;
import com.bookstore.storeservice.service.BranchService;
import com.bookstore.storeservice.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/me/branch")
public class BranchController {

    private final BranchService branchService;
    private final StoreService storeService;

    @PostMapping
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> createBranch(
            @AuthenticationPrincipal Jwt jwt
            , @Valid @RequestBody CreateBranchRequest request
    ){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

        BranchResponse response = branchService.CreateBranch(storeId, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Branch created successfully", response));

    }

    @GetMapping
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<List<BranchResponse>>> getMyBranch(@AuthenticationPrincipal Jwt jwt){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

        List<BranchResponse> responses = branchService.getMyBranches(storeId);

        return ResponseEntity.ok(ApiResponse.ok(responses));

    }

    @GetMapping("/{branchId}")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> getBranch(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID branchId
            ){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

        BranchResponse response = branchService.getBranch(storeId, branchId);

        return ResponseEntity.ok(ApiResponse.ok(response));

    }

    @GetMapping("/{branchId}/exists")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<Boolean>> branchExists(
            UUID storeId,
            @PathVariable UUID branchId
    ){

        boolean response = branchService.branchExists(storeId, branchId);

        return ResponseEntity.ok(ApiResponse.ok(response));

    }

    @PutMapping("/{branchId}")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> updateBranch(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID branchId,
            @Valid @RequestBody UpdateBranchRequest request
    ){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

        BranchResponse response = branchService.updateBranch(storeId, branchId, request);

        return ResponseEntity
                .ok(ApiResponse.ok("Branch updated successfully", response));

    }

    @DeleteMapping("{branchId}")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> deleteBranch(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID branchId
    ){

        UUID storeId = UUID.fromString(jwt.getClaim("store_id"));

       branchService.deleteBranch(storeId, branchId);

       return ResponseEntity.ok(ApiResponse.ok("Branch deleted successfully", null));

    }

}
