package com.bookstore.storeservice.service;

import com.bookstore.storeservice.dto.StoreDto.*;
import com.bookstore.storeservice.entity.Store;
import com.bookstore.storeservice.event.*;
import com.bookstore.storeservice.exception.ConflictException;
import com.bookstore.storeservice.exception.ResourceNotFoundException;
import com.bookstore.storeservice.repository.StoreRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {

    private final StoreRepository storeRepository;
//    private final StoreOwnerRepository storeOwnerRepository;
    private final StoreEventPublisher storeEventPublisher;
    private final MinioService minioService;
    private final EmailService emailService;

    @Value("${keycloak.realm}")
    private String realm;

    @Transactional
    public void createStoreFormApprovedApplication(StoreApplicationApprovedEvent event){

        if (storeRepository.existsByEmail(event.getBusinessEmail())) {
            log.warn("Store already exists for email: {}", event.getBusinessEmail());
            return;
        }

        Store store = Store.builder()
                .storeName(event.getStoreName() != null ? event.getStoreName() : "My Store")
                .businessRegNumber(event.getBusinessRegNumber() != null ?
                        event.getBusinessRegNumber() : event.getApplicationId().toString())
                .tin(event.getTin() != null ? event.getTin() : event.getApplicationId().toString())
                .region(event.getRegion() != null ? event.getRegion() : "")
                .city(event.getCity() != null ? event.getCity() : "")
                .address(event.getAddress() != null ? event.getAddress() : "")
                .email(event.getBusinessEmail())
                .phone(event.getPhone())
                .bankName(event.getBankName())
                .bankAccount(event.getBankAccount())
                .plan(Store.Plan.FREE)
                .verificationStatus(Store.VerificationStatus.AWAITING_DOCS)
                .build();

        Store savedStore = storeRepository.save(store);

        storeEventPublisher.publishCreateStoreOwner(
                new CreateStoreOwnerEvent(
                        savedStore.getId(),
                        event.getOwnerKeycloakId()

                )
        );

        log.info("Published CreateStoreOwnerEvent for storeId: {}", savedStore.getId());

        emailService.sendCompleteProfileEmail(savedStore.getEmail(), savedStore.getStoreName());

        log.info("Successfully created store and store owner for applicationId: {} and email sent to: {}",
                event.getApplicationId(), savedStore.getEmail());

        storeEventPublisher.publishStoreCreated(
                new StoreCreatedEvent(
                        savedStore.getId(),
                        savedStore.getEmail(),
                        savedStore.getStoreName()
                )
        );

    }

    @Transactional
    public StoreResponse completeProfile(UUID storeId, CompleteStoreProfileRequest request, MultipartFile ownerIdFile, MultipartFile businessLicenseFile){

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found"));

        if (storeRepository.existsByBusinessRegNumber(request.businessRegNumber()))
            throw new ConflictException("Business Reg number already in use");

        if (storeRepository.existsByTin(request.tin()))
            throw new ConflictException("TIN already in use");

        if (store.getVerificationStatus() != Store.VerificationStatus.AWAITING_DOCS)
            throw new ConflictException("Store is not awaiting documents");

        log.info("Owner file name: {}", ownerIdFile.getOriginalFilename());
        log.info("License file name: {}", businessLicenseFile.getOriginalFilename());

        String ownerIdUrl = minioService.uploadFile(ownerIdFile, "owner-id");
        String licenseUrl = minioService.uploadFile(businessLicenseFile, "business-license");

        store.setStoreName(request.storeName());
        store.setBusinessRegNumber(request.businessRegNumber());
        store.setTin(request.tin());
        store.setRegion(request.region());
        store.setCity(request.city());
        store.setAddress(request.address());
        store.setBankName(request.bankName());
        store.setBankAccount(request.bankAccount());
        store.setOwnerIdUrl(ownerIdUrl);
        store.setBusinessLicenseUrl(licenseUrl);
        store.setVerificationStatus(Store.VerificationStatus.DOCS_SUBMITTED);

        return toStoreResponse(storeRepository.save(store));

    }

    @Transactional
    public void handleStripeAccountCreated(StripeAccountCreatedEvent event){

        Store storeWithStripe = storeRepository.findById(event.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("Store not found"));

        storeWithStripe.setStripeAccountId(event.getStripeAccountId());
        storeRepository.save(storeWithStripe);

        log.info("Stripe account ID saved for storeId: {}", event.getStoreId());

    }

    public String getStripeAccountId(UUID storeId){

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found"));

        return store.getStripeAccountId();

    }

    public StoreResponse getStore(UUID storeId){

        Store store = storeRepository
                .findById(storeId).orElseThrow(()-> new ResourceNotFoundException("Store Not Found"));

        return toStoreResponse(store);

    }

    public StoreResponse getMyStore(UUID storeId){


        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found"));

        return toStoreResponse(store);

    }

    public StoreResponse updateStore(UUID storeId, UpdateStoreRequest request){


        Store store = storeRepository.findById(storeId)
                        .orElseThrow(() -> new ResourceNotFoundException("Store not found"));
        store.setStoreName(request.storeName());
        store.setRegion(request.region());
        store.setCity(request.city());
        store.setAddress(request.address());
        store.setPhone(request.phone());
        store.setBankName(request.bankName());
        store.setBankAccount(request.bankAccount());

        return toStoreResponse(storeRepository.save(store));

    }

    private StoreResponse toStoreResponse(Store store) {
        return new StoreResponse(
                store.getId(),
                store.getStoreName(),
                store.getBusinessRegNumber(),
                store.getTin(),
                store.getRegion(),
                store.getCity(),
                store.getAddress(),
                store.getEmail(),
                store.getPhone(),
                store.getBankName(),
                store.getBankAccount(),
                store.getPlan().name(),
                store.getVerificationStatus().name(),
                store.getRejectionReason(),
                store.getCreatedAt()
        );
    }


}
