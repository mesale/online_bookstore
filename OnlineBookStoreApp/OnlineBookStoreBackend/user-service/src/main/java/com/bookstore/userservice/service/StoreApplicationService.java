package com.bookstore.userservice.service;

import com.bookstore.userservice.dto.StoreApplicationDto.*;
import com.bookstore.userservice.entity.StoreApplication;
import com.bookstore.userservice.entity.User;
import com.bookstore.userservice.event.StoreApplicationApprovedEvent;
import com.bookstore.userservice.event.StoreEventPublisher;
import com.bookstore.userservice.exception.ConflictException;
import com.bookstore.userservice.exception.ResourceNotFoundException;
import com.bookstore.userservice.repository.StoreApplicationRepository;
import com.bookstore.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StoreApplicationService {

    private final StoreApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final StoreEventPublisher storeEventPublisher;
    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public StoreApplicationResponse submitApplication(String keycloakId, SubmitApplicationRequest request){
        User user = userRepository.findByKeycloakId(keycloakId).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        if(applicationRepository.existsByUserIdAndStatus(user.getId(), StoreApplication.Status.PENDING))
            throw new ConflictException("You already have a pending request");
        StoreApplication storeApplication =StoreApplication.builder()
                .user(user)
                .businessEmail(request.businessEmail())
                .status(StoreApplication.Status.PENDING)
                .build();

        return toApplicationResponse(applicationRepository.save(storeApplication));
    }

    public StoreApplicationResponse getMyApplication(String keycloakId){

        User user = userRepository.findByKeycloakId(keycloakId).orElseThrow(() -> new ResourceNotFoundException("User not found"));


        StoreApplication storeApplication = applicationRepository.
                findByUserIdAndStatus(user.getId(), StoreApplication.Status.PENDING)
                .orElseThrow(() -> new ResourceNotFoundException("No applications found"));

        return toApplicationResponse(storeApplication);
    }

    public List<StoreApplicationResponse> getAllPending(){
        return applicationRepository.findByStatus(StoreApplication.Status.PENDING)
                .stream()
                .map(this::toApplicationResponse)
                .toList();
    }

    public StoreApplicationResponse approveApplication(UUID applicationId){
        StoreApplication application = applicationRepository
                .findById(applicationId).orElseThrow(() -> new ResourceNotFoundException("Application not Found"));
        if (application.getStatus() != StoreApplication.Status.PENDING)
            throw new ConflictException("Application is not in pending state");

        RoleRepresentation storeAdminRole = keycloak.realm(realm)
                .roles()
                .get("ROLE_STORE_ADMIN")
                .toRepresentation();
        keycloak.realm(realm)
                .users()
                .get(application.getUser().getKeycloakId())
                .roles()
                .realmLevel()
                .add(Collections.singletonList(storeAdminRole));

        application.setStatus(StoreApplication.Status.APPROVED);
        application.setReviewedAt(LocalDateTime.now());
        applicationRepository.save(application);

        StoreApplicationApprovedEvent event = StoreApplicationApprovedEvent.builder()
                .applicationId(applicationId)
                .userId(application.getUser().getId())
                .ownerKeycloakId(application.getUser().getKeycloakId())
                .ownerName(application.getUser().getName())
                .ownerEmail(application.getUser().getEmail())
                .ownerPhone(application.getUser().getPhone())
                .businessEmail(application.getBusinessEmail())
                .build();

        storeEventPublisher.publishStoreApplicationApproved(event);

        return toApplicationResponse(application);
    }

    public StoreApplicationResponse rejectApplication(UUID applicationId, String rejectionReason){

        StoreApplication application = applicationRepository
                .findById(applicationId).orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (application.getStatus() != StoreApplication.Status.PENDING)
            throw new ConflictException("Application not in pending state");

        application.setStatus(StoreApplication.Status.REJECTED);
        application.setRejectionReason(rejectionReason);
        application.setReviewedAt(LocalDateTime.now());

        applicationRepository.save(application);

        return toApplicationResponse(application);

    }

    public StoreApplicationResponse toApplicationResponse(StoreApplication storeApplication){
        return new StoreApplicationResponse(
                storeApplication.getId(),
                storeApplication.getUser().getId(),
                storeApplication.getBusinessEmail(),
                storeApplication.getStatus(),
                storeApplication.getRejectionReason(),
                storeApplication.getSubmittedAt(),
                storeApplication.getReviewedAt()
        );
    }

}
