package com.bookstore.userservice.controller;

import com.bookstore.userservice.dto.ApiResponse;
import com.bookstore.userservice.dto.UserDto.*;
import com.bookstore.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterUserRequest request){
       UserResponse response =  userService.registerUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.ok("User registered successfully", response));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserResponse>> getMyProfile(@AuthenticationPrincipal Jwt jwt){

        UserResponse response = userService.getByKeycloakId(jwt.getSubject());

        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PutMapping("/me")
//    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserResponse>> userProfile(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateProfileRequest request
    ){

        UserResponse response = userService.updateUser(jwt.getSubject(), request);

        return ResponseEntity.ok(ApiResponse.ok("Profile Updated Successfully", response));
    }

//    @GetMapping
//    @PreAuthorize("hasRole('ADMIN')")
//    public List<User> getUsers(){
//        return keycloakUserService.getUsers();
//    }
//
//    @GetMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public User adminEndpoint(@PathVariable long id){
//        return keycloakUserService.getUser(id);
//    }
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public void deleteUser(@PathVariable long id){
//        keycloakUserService.deleteUser(id);
//    }



}
