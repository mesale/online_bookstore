package com.bookstore.userservice.repository;

import com.bookstore.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByKeycloakId(String keycloakId);

}
