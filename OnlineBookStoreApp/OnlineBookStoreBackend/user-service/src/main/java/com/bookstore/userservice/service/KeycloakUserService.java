package com.bookstore.userservice.service;

import com.bookstore.userservice.dto.RegisterRequest;
import com.bookstore.userservice.entity.User;
import com.bookstore.userservice.repository.UserRepository;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class KeycloakUserService {

    private final UserRepository userRepository;
    private final String realm = "bookstore-realm";

    public KeycloakUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private Keycloak getKeycloakInstance() {
        String adminClient = "bookstore-backend";
        String adminPassword = "admin123";
        String adminUsername = "bookstore-admin";

        String serverUrl = "http://bookstore-keycloak:8080";
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .username(adminUsername)
                .password(adminPassword)
                .clientId(adminClient)
                .build();
    }

    public void registerUser(RegisterRequest registerRequest) {
        Keycloak keycloak = getKeycloakInstance();

        UserRepresentation user = new UserRepresentation();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setEnabled(true);
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(registerRequest.getPassword());
        credential.setTemporary(false);

        user.setCredentials(Collections.singletonList(credential));

        Response response =keycloak.realm(realm).users().create(user);

        if (response.getStatus()!=201){
            throw new RuntimeException("Failed to create user: " + response.getStatus());
        }

        String keycloakId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
        response.close();

        RoleRepresentation userRole;
        try {
            userRole = keycloak.realm(realm).roles().get("ROLE_USER").toRepresentation();
        } catch (NotFoundException e) {
            throw new RuntimeException("Role ROLE_USER not found in realm: " + realm, e);
        }
        keycloak.realm(realm).users().get(keycloakId)
                .roles().realmLevel().add(Collections.singletonList(userRole));

        User localUser = new User();
        localUser.setKeycloakId(keycloakId);
        localUser.setUsername(registerRequest.getUsername());
        localUser.setEmail(registerRequest.getEmail());
        localUser.setFirstname(registerRequest.getFirstName());
        localUser.setLastName(registerRequest.getLastName());
        localUser.setCreatedAt(LocalDateTime.now());

        userRepository.save(localUser);
    }

    public User userProfile(String keycloakId) {
        Optional<User> result = userRepository.findByKeycloakId(keycloakId);
        if (result.isPresent()) {
            return result.get();
        }
        throw new RuntimeException("User not found");
    }

    public List<User> getUsers() {
        return userRepository.findAll().stream().toList();
    }

    public User getUser(long id) {

        Optional<User> result = userRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        throw new NotFoundException("User was not found at id " + id);
    }

    public void deleteUser(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User was not found at id " + id));
        deleteKeycloakUser(user.getKeycloakId());
        userRepository.deleteById(id);
    }

    private void deleteKeycloakUser(String keycloakId) {
        Keycloak keycloak = getKeycloakInstance();
        Response response = keycloak.realm(realm).users().delete(keycloakId);
        int status = response.getStatus();
        response.close();

        if (status == 204 || status == 404) {
            return;
        }

        if (status == 401 || status == 403) {
            throw new RuntimeException("Not authorized to delete user in Keycloak. Status: " + status);
        }

        throw new RuntimeException("Failed to delete user in Keycloak. Status: " + status);
    }
}
