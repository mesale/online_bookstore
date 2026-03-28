package com.bookstore.storeservice.service;

import com.bookstore.storeservice.dto.StoreDto.*;
import com.bookstore.storeservice.entity.Store;
import com.bookstore.storeservice.entity.StoreOwner;
import com.bookstore.storeservice.event.StoreApplicationApprovedEvent;
import com.bookstore.storeservice.exception.ResourceNotFoundException;
import com.bookstore.storeservice.repository.StoreOwnerRepository;
import com.bookstore.storeservice.repository.StoreRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {

    private final StoreRepository storeRepository;
    private final StoreOwnerRepository storeOwnerRepository;
    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    @Transactional
    public void createStoreFormApprovedApplication(StoreApplicationApprovedEvent event){

        if (storeOwnerRepository.existsByKeycloakId(event.getOwnerKeycloakId())){
            log.warn("Store owner already exists for keycloakId: {}. Skipping.", event.getOwnerKeycloakId());
            return;
        }

        try {

            RoleRepresentation storeAdmin = keycloak.realm(realm)
                    .roles()
                    .get("ROLE_STORE_ADMIN")
                    .toRepresentation();

            keycloak.realm(realm).users()
                    .get(event.getOwnerKeycloakId())
                    .roles().realmLevel()
                    .add(Collections.singletonList(storeAdmin));


        } catch(Exception ex){
            log.warn("Could not assign ROLE_STORE_ADMIN to keycloakId: {}. " +
                    "Role may already be assigned.", event.getOwnerKeycloakId());
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
                .verificationStatus(Store.VerificationStatus.APPROVED)
                .build();

        Store savedStore = storeRepository.save(store);

        StoreOwner storeOwner = StoreOwner.builder()
                .keycloakId(event.getOwnerKeycloakId())
                .store(savedStore)
                .name(event.getOwnerName())
                .email(event.getOwnerEmail())
                .phone(event.getOwnerPhone())
                .build();

        UserRepresentation updatedOwner = keycloak.realm(realm).users().get(event.getOwnerKeycloakId()).toRepresentation();
        Map<String, List<String>> attributes = updatedOwner.getAttributes();
        if (attributes == null) attributes = new HashMap<>();

        attributes.put("store_id", List.of(savedStore.getId().toString()));
        updatedOwner.setAttributes(attributes);

        keycloak.realm(realm).users().get(storeOwner.getKeycloakId()).update(updatedOwner);

        storeOwnerRepository.save(storeOwner);
        log.info("Successfully created store and store owner for applicationId: {}",
                event.getApplicationId());

    }

    public StoreResponse getStore(UUID storeId){

        Store store = storeRepository
                .findById(storeId).orElseThrow(()-> new ResourceNotFoundException("Store Not Found"));

        return toStoreResponse(store);

    }

    public StoreResponse getMyStore(String keycloakId){

        StoreOwner storeOwner = storeOwnerRepository
                .findByKeycloakId(keycloakId).orElseThrow(()-> new ResourceNotFoundException("Store Not Found"));

        return toStoreResponse(storeOwner.getStore());

    }

    public StoreResponse updateStore(String keycloakId, UpdateStoreRequest request){

        StoreOwner storeOwner = storeOwnerRepository
                .findByKeycloakId(keycloakId).orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        Store store = storeOwner.getStore();
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
