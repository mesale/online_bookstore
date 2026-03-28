package com.bookstore.storeservice.service;

import com.bookstore.storeservice.dto.BranchDto.*;
import com.bookstore.storeservice.entity.Branch;
import com.bookstore.storeservice.entity.StoreOwner;
import com.bookstore.storeservice.exception.ConflictException;
import com.bookstore.storeservice.exception.ResourceNotFoundException;
import com.bookstore.storeservice.repository.BranchRepository;
import com.bookstore.storeservice.repository.StoreOwnerRepository;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class BranchService {

    private final BranchRepository branchRepository;
    private final StoreOwnerRepository storeOwnerRepository;

    public BranchResponse CreateBranch(String keycloakId, CreateBranchRequest request){

        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));
        if (branchRepository.existsByBranchNameAndStoreId(request.branchName(), storeOwner.getStore().getId()))
            throw new ConflictException("Branch with this name already exists in your store");

        Branch branch = Branch.builder()
                .store(storeOwner.getStore())
                .branchName(request.branchName())
                .region(request.region())
                .city(request.city())
                .address(request.address())
                .phone(request.phone())
                .build();

        return toBranchResponse(branchRepository.save(branch));

    }

    public List<BranchResponse> getMyBranches(String keycloakId){

        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner Not found"));

        return branchRepository.findByStoreId(storeOwner.getStore().getId())
                .stream()
                .map(this::toBranchResponse)
                .toList();

    }

    public BranchResponse getBranch(String keycloakId, UUID branchId){

        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        Branch branch = branchRepository.findByIdAndStoreId(branchId, storeOwner.getStore().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        return toBranchResponse(branch);

    }

    public BranchResponse updateBranch(String keycloakId, UUID branchId, UpdateBranchRequest request){

        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        Branch branch = branchRepository.findByIdAndStoreId(branchId, storeOwner.getStore().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        branch.setBranchName(request.branchName());
        branch.setRegion(request.region());
        branch.setCity(request.city());
        branch.setAddress(request.address());
        branch.setPhone(request.phone());

        return toBranchResponse(branchRepository.save(branch));

    }

    public void deleteBranch(String keycloakId, UUID branchId){

        StoreOwner storeOwner = storeOwnerRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new NotFoundException("Owner not found"));

        Branch branch = branchRepository.findByIdAndStoreId(branchId, storeOwner.getStore().getId())
                .orElseThrow(() -> new NotFoundException("Branch not found"));

        branchRepository.delete(branch);

    }

    private BranchResponse toBranchResponse(Branch branch) {
        return new BranchResponse(
                branch.getId(),
                branch.getStore().getId(),
                branch.getBranchName(),
                branch.getRegion(),
                branch.getCity(),
                branch.getAddress(),
                branch.getPhone(),
                branch.getCreatedAt()
        );
    }
}


