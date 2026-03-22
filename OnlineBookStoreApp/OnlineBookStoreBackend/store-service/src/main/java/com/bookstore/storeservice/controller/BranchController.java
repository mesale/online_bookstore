package com.bookstore.storeservice.controller;

import com.bookstore.storeservice.dto.ApiResponse;
import com.bookstore.storeservice.dto.BranchDto.*;
import com.bookstore.storeservice.service.BranchService;
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

    @PostMapping
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> createBranch(
            @AuthenticationPrincipal Jwt jwt
            , @Valid @RequestBody CreateBranchRequest request
    ){
        BranchResponse response = branchService.CreateBranch(jwt.getSubject(), request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Branch created successfully", response));

    }

    @GetMapping
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<List<BranchResponse>>> getMyBranch(@AuthenticationPrincipal Jwt jwt){

        List<BranchResponse> responses = branchService.getMyBranches(jwt.getSubject());

        return ResponseEntity.ok(ApiResponse.ok(responses));

    }

    @GetMapping("/{branchId}")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> getBranch(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID branchId
            ){

        BranchResponse response = branchService.getBranch(jwt.getSubject(), branchId);

        return ResponseEntity.ok(ApiResponse.ok(response));

    }

    @PutMapping("/{branchId}")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> updateBranch(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID branchId,
            @Valid @RequestBody UpdateBranchRequest request
    ){

        BranchResponse response = branchService.updateBranch(jwt.getSubject(), branchId, request);

        return ResponseEntity
                .ok(ApiResponse.ok("Branch updated successfully", response));

    }

    @DeleteMapping("{branchId}")
    @PreAuthorize("hasRole('STORE_ADMIN')")
    public ResponseEntity<ApiResponse<BranchResponse>> deleteBranch(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID branchId
    ){

       branchService.deleteBranch(jwt.getSubject(), branchId);

       return ResponseEntity.ok(ApiResponse.ok("Branch deleted successfully", null));

    }

}
