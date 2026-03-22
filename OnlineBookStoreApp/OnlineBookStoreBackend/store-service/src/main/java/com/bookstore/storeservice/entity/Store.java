package com.bookstore.storeservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "stores", schema = "svc_store")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Store {

    public enum Plan { FREE, PREMIUM }
    public enum VerificationStatus { PENDING, APPROVED, REJECTED }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "store_name", nullable = false)
    private String storeName;

    @Column(name = "business_reg_number", nullable = false, unique = true)
    private String businessRegNumber;

    @Column(nullable = false, unique = true)
    private String tin;

    @Column(name = "owner_id_url")
    private String ownerIdUrl;

    @Column(name = "business_license_url")
    private String businessLicenseUrl;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "bank_account")
    private String bankAccount;

    @Column(nullable = false)
    private String region;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Plan plan = Plan.FREE;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

}
