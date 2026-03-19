package com.bookstore.userservice.controller;

import com.bookstore.userservice.dto.ApiResponse;
import com.bookstore.userservice.dto.StoreApplicationDto.*;
import com.bookstore.userservice.service.StoreApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me/store-applicaation")
@RequiredArgsConstructor
public class StoreApplicationController {

    private final StoreApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApiResponse<StoreApplicationResponse>> submitApplication(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody SubmitApplicationRequest request
    ){

        StoreApplicationResponse response = applicationService.submitApplication(jwt.getSubject(), request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Application Submitted successfully", response));

    }

    @GetMapping
    public ResponseEntity<ApiResponse<StoreApplicationResponse>> getMyApplication(@AuthenticationPrincipal Jwt jwt){

        StoreApplicationResponse response =applicationService.getMyApplication(jwt.getSubject());

        return ResponseEntity.ok(ApiResponse.ok(response));
    }

}
