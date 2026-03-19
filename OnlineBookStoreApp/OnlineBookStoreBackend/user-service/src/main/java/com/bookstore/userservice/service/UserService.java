package com.bookstore.userservice.service;

import com.bookstore.userservice.dto.UserDto.*;
import com.bookstore.userservice.entity.User;
import com.bookstore.userservice.exception.ConflictException;
import com.bookstore.userservice.exception.KeycloakException;
import com.bookstore.userservice.exception.ResourceNotFoundException;
import com.bookstore.userservice.repository.UserRepository;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public UserResponse registerUser(RegisterUserRequest request) {

        if (userRepository.existsByEmail(request.email()))
            throw new ConflictException("Email already in use");

        UserRepresentation keycloakUser = new UserRepresentation();
        keycloakUser.setEmail(request.email());
        keycloakUser.setUsername(request.email());
        keycloakUser.setEnabled(true);
        keycloakUser.setEmailVerified(true);
        keycloakUser.setFirstName(request.name());

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(request.password());
        credential.setTemporary(false);
        keycloakUser.setCredentials(Collections.singletonList(credential));

        Response response =keycloak.realm(realm).users().create(keycloakUser);

        if (response.getStatus()!=201){
            throw new KeycloakException("Failed to create keycloakU  ser: " + response.getStatus());
        }

        String keycloakId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
        response.close();

        RoleRepresentation userRole;
        try {
            userRole = keycloak.realm(realm).roles().get("ROLE_USER").toRepresentation();

            keycloak.realm(realm).users().get(keycloakId)
                    .roles().realmLevel().add(Collections.singletonList(userRole));

            User user = User.builder()
                    .keycloakId(keycloakId)
                    .name(request.name())
                    .email(request.email())
                    .phone(request.phone())
                    .build();


            return touserResponse(userRepository.save(user));
        } catch (Exception e) {
            throw new RuntimeException("Postgres save failed. Keycloak user rolled back. Error: " + e.getMessage());
        }

    }

    public UserResponse getByKeycloakId(String keycloakId){
        User user = userRepository.findByKeycloakId(keycloakId).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
        return touserResponse(user);
    }

    public UserResponse updateUser(String keycloakId,UpdateProfileRequest request){
        User user = userRepository.findByKeycloakId(keycloakId).orElseThrow(() ->new ResourceNotFoundException("User Not Found"));

        user.setName(request.name());
        user.setPhone(request.phone());

        return touserResponse(userRepository.save(user));
    }

//    public User userProfile(String keycloakId) {
//        Optional<User> result = userRepository.findByKeycloakId(keycloakId);
//        if (result.isPresent()) {
//            return result.get();
//        }
//        throw new RuntimeException("User not found");
//    }
//
//    public List<User> getUsers() {
//        return userRepository.findAll().stream().toList();
//    }
//
//    public User getUser(long id) {
//
//        Optional<User> result = userRepository.findById(id);
//        if (result.isPresent()) {
//            return result.get();
//        }
//        throw new NotFoundException("User was not found at id " + id);
//    }
//
//    public void deleteUser(long id) {
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new NotFoundException("User was not found at id " + id));
//        deleteKeycloakUser(user.getKeycloakId());
//        userRepository.deleteById(id);
//    }
//
//    private void deleteKeycloakUser(String keycloakId) {
//        Keycloak keycloak = getKeycloakInstance();
//        Response response = keycloak.realm(realm).users().delete(keycloakId);
//        int status = response.getStatus();
//        response.close();
//
//        if (status == 204 || status == 404) {
//            return;
//        }
//
//        if (status == 401 || status == 403) {
//            throw new RuntimeException("Not authorized to delete user in Keycloak. Status: " + status);
//        }
//
//        throw new RuntimeException("Failed to delete user in Keycloak. Status: " + status);
//    }

    private UserResponse touserResponse(User user){
        return new UserResponse(
                user.getId(),
                user.getKeycloakId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getCreatedAt()
        );
    }
}
