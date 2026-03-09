package com.bookstore.userservice.controller;

import com.bookstore.userservice.dto.RegisterRequest;
import com.bookstore.userservice.entity.User;
import com.bookstore.userservice.service.KeycloakUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final KeycloakUserService keycloakUserService;

    public UserController(KeycloakUserService keycloakUserService) {
        this.keycloakUserService = keycloakUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){
        keycloakUserService.registerUser(registerRequest);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/public/hello")
    public String publicEndpoint(){
        return "public endpoint working";
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public User userProfile(@AuthenticationPrincipal Jwt jwt){
        return keycloakUserService.userProfile(jwt.getClaim("sub"));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers(){
        return keycloakUserService.getUsers();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User adminEndpoint(@PathVariable long id){
        return keycloakUserService.getUser(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable long id){
        keycloakUserService.deleteUser(id);
    }



}
