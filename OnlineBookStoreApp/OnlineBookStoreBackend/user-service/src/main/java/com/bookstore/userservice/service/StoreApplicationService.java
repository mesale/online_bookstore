package com.bookstore.userservice.service;

import com.bookstore.userservice.dto.StoreApplicationDto.*;
import com.bookstore.userservice.entity.StoreApplication;
import com.bookstore.userservice.entity.User;
import com.bookstore.userservice.exception.ConflictException;
import com.bookstore.userservice.exception.ResourceNotFoundException;
import com.bookstore.userservice.repository.StoreApplicationRepository;
import com.bookstore.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreApplicationService {

    private final StoreApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public StoreApplicationResponse submitApplication(String keycloakId, SubmitApplicationRequest request){
        User user = userRepository.findByKeycloakId(keycloakId).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        if(applicationRepository.existsByUserIdAndStatus(user.getId(), StoreApplication.Status.PENDING))
            throw new ConflictException("You already have a pending request");
        StoreApplication storeApplication =StoreApplication.builder()
                .user(user)
                .businessEmail(request.businessEmail())
                .status(StoreApplication.Status.PENDING)
                .build();

        return toApplicationResponse(storeApplication);
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
