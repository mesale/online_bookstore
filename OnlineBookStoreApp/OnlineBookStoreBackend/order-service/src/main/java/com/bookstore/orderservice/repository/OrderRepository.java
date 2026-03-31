package com.bookstore.orderservice.repository;

import com.bookstore.orderservice.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByBuyerKeycloakId(String buyerKeycloakId);

    List<Order> findByBranchId(UUID branchId);

    List<Order> findByBranchIdAndStatus(UUID branchId, Order.Status status);

    List<Order> findByStoreId(UUID storeId);

    List<Order> findByStoreIdAndStatus(UUID storeId, Order.Status status);

    Optional<Order> findByIdAndBuyerKeycloakId(UUID orderId, String buyerKeycloakId);

    Optional<Order> findByIdAndBranchId(UUID orderId, UUID branchId);

    Optional<Order> findByDeliveryPin(String deliveryPin);

}
