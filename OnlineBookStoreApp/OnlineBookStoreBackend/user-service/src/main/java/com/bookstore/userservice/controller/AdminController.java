package com.bookstore.userservice.controller;

import com.bookstore.userservice.dto.ApiResponse;
import com.bookstore.userservice.dto.StoreApplicationDto.*;
import com.bookstore.userservice.service.StoreApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final StoreApplicationService applicationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StoreApplicationResponse>>> getPendingApplications(){

        List<StoreApplicationResponse> response = applicationService.getAllPending();

        return ResponseEntity.ok(ApiResponse.ok(response));
    }

}
