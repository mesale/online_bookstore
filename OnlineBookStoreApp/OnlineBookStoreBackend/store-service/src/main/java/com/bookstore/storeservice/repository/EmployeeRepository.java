package com.bookstore.storeservice.repository;

import com.bookstore.storeservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    List<Employee> findByBranchId(UUID branchId);

    List<Employee> findByStoreId(UUID storeId);

    Optional<Employee> findByKeycloakId(String keycloakId);

    boolean existsByEmail(String email);

    boolean existsByKeycloakId(String keycloakId);

}
