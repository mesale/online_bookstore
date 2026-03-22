package com.bookstore.storeservice.service;

import com.bookstore.storeservice.dto.EmployeeDto.*;
import com.bookstore.storeservice.entity.Branch;
import com.bookstore.storeservice.entity.Employee;
import com.bookstore.storeservice.entity.StoreOwner;
import com.bookstore.storeservice.exception.ConflictException;
import com.bookstore.storeservice.exception.KeycloakException;
import com.bookstore.storeservice.exception.ResourceNotFoundException;
import com.bookstore.storeservice.repository.BranchRepository;
import com.bookstore.storeservice.repository.EmployeeRepository;
import com.bookstore.storeservice.repository.StoreOwnerRepository;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.rmi.server.UID;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BranchRepository branchRepository;
    private final StoreOwnerRepository storeOwnerRepository;
    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public EmployeeResponse inviteEmployee(String keycloakId, UUID branchId, InviteEmployeeRequest request){

        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        Branch branch = branchRepository.findByIdAndStoreId(branchId, storeOwner.getStore().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        if (employeeRepository.existsByEmail(request.email()))
            throw new ConflictException("Employee with this email already exists");

        UserRepresentation keycloakUser = new  UserRepresentation();
        keycloakUser.setEmail(request.email());
        keycloakUser.setUsername(request.email());
        keycloakUser.setFirstName(request.name());
        keycloakUser.setEnabled(true);
        keycloakUser.setEmailVerified(true);

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(request.password());
        credential.setTemporary(true);
        keycloakUser.setCredentials(Collections.singletonList(credential));

        Response response = keycloak.realm(realm).users().create(keycloakUser);

        if (response.getStatus() !=201)
            throw new KeycloakException("Failed to create employee in Keycloak: "
                    + response.getStatus());

        String employeeKeycloakId = response.getLocation()
                .getPath()
                .replaceAll(".*/([^/]+)$", "$1");

        response.close();

        RoleRepresentation employeeRole = keycloak.realm(realm)
                .roles()
                .get("ROLE_EMPLOYEE")
                .toRepresentation();

        keycloak.realm(realm).users()
                .get(employeeKeycloakId)
                .roles().realmLevel()
                .add(Collections.singletonList(employeeRole));

        Employee employee = Employee.builder()
                .keycloakId(employeeKeycloakId)
                .store(storeOwner.getStore())
                .branch(branch)
                .name(request.name())
                .email(request.email())
                .role(request.role())
                .build();

        return toEmployeeResponse(employeeRepository.save(employee));

    }

    public List<EmployeeResponse> getBranchEmployees(String keycloakId, UUID branchId){
        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        branchRepository.findByIdAndStoreId(branchId, storeOwner.getStore().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        return employeeRepository.findByBranchId(branchId)
                .stream()
                .map(this::toEmployeeResponse)
                .toList();

    }

    public List<EmployeeResponse> getAllStoreEmployees(String keycloakId){

        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        return employeeRepository.findByStoreId(storeOwner.getStore().getId())
                .stream()
                .map(this::toEmployeeResponse)
                .toList();

    }

    private EmployeeResponse toEmployeeResponse(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getKeycloakId(),
                employee.getStore().getId(),
                employee.getBranch().getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getRole().name(),
                employee.getCreatedAt()
        );
    }

}
