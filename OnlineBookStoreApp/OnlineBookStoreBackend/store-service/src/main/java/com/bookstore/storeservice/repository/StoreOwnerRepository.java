package com.bookstore.storeservice.repository;

import com.bookstore.storeservice.entity.StoreOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StoreOwnerRepository extends JpaRepository<StoreOwner, UUID> {

    Optional<StoreOwner> findByKeycloakId(String keycloakId);

    Optional<StoreOwner> findByStoreId(UUID storeId);

    boolean existsByKeycloakId(String keycloakId);

}
