package com.bookstore.orderservice.service;

import com.bookstore.orderservice.dto.OrderDto.*;
import com.bookstore.orderservice.entity.Order;
import com.bookstore.orderservice.entity.OrderItem;
import com.bookstore.orderservice.event.DeliveryConfirmedEvent;
import com.bookstore.orderservice.event.OrderCreatedEvent;
import com.bookstore.orderservice.event.OrderEventPublisher;
import com.bookstore.orderservice.event.PaymentCompletedEvent;
import com.bookstore.orderservice.exception.UnauthorizedException;
import com.bookstore.orderservice.repository.OrderItemRepository;
import com.bookstore.orderservice.repository.OrderRepository;
import com.bookstore.orderservice.exception.ConflictException;
import com.bookstore.orderservice.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderEventPublisher orderEventPublisher;

    @Value("${order.delivery.pin.expiry-minutes}")
    private int pinExpiryMinutes;

    private static final BigDecimal FREE_PLAN_COMMISSION_RATE = new BigDecimal("0.05");
    private static final BigDecimal PREMIUM_PLAN_COMMISSION_RATE = new BigDecimal("0.02");

    @Transactional
    public OrderResponse createOrder(String buyerKeycloakId, CreateOrderRequest request){

        BigDecimal totalPrice = request.items().stream()
                .map(item -> item.price().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .buyerKeycloakId(buyerKeycloakId)
                .branchId(request.branchId())
                .storeId(request.storeId())
                .totalPrice(totalPrice)
                .status(Order.Status.PENDING)
                .paymentStatus(Order.PaymentStatus.PENDING)
                .shippingAddress(request.shippingAddress())
                .build();

        Order savedOrder = orderRepository.save(order);

        List<OrderItem> items = request.items().stream()
                .map(item -> OrderItem.builder()
                        .order(savedOrder)
                        .bookId(item.bookId())
                        .quantity(item.quantity())
                        .price(item.price())
                        .build())
                .toList();

        orderItemRepository.saveAll(items);
        savedOrder.setItems(items);

        orderEventPublisher.publishOrderCreated(OrderCreatedEvent.builder()
                .orderId(savedOrder.getId())
                .buyerKeycloakId(buyerKeycloakId)
                .branchId(savedOrder.getBranchId())
                .storeId(savedOrder.getStoreId())
                .totalPrice(savedOrder.getTotalPrice())
                .shippingAddress(savedOrder.getShippingAddress())
                .build());

        return toOrderResponse(orderRepository.save(savedOrder));

    }

    public List<OrderSummaryResponse> getMyOrders(String buyerKeycloakId){

        return orderRepository.findByBuyerKeycloakId(buyerKeycloakId)
                .stream()
                .map(this::toOrderSummaryResponse)
                .toList();

    }

    public OrderResponse getMyOrder(UUID orderId, String buyerKeycloakId){

        Order order = orderRepository.findByIdAndBuyerKeycloakId(orderId, buyerKeycloakId)
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));

        return toOrderResponse(order);

    }

    @Transactional
    public void handlePaymentCompleted(PaymentCompletedEvent event){

        Order order = orderRepository.findById(event.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        String pin = generatePin();

        order.setStatus(Order.Status.PAID);
        order.setPaymentStatus(Order.PaymentStatus.COMPLETED);
        order.setStripePaymentId(event.getStripePaymentId());
        order.setDeliveryPin(pin);
        order.setDeliveryPinUsed(false);
        order.setDeliveryPinExpiry(LocalDateTime.now().plusMinutes(pinExpiryMinutes));

        orderRepository.save(order);
        log.info("Payment completed for orderId: {}", event.getOrderId());

    }

    public List<OrderSummaryResponse> getBranchOrders(UUID branchId){

        return orderRepository.findByBranchId(branchId)
                .stream()
                .map(this::toOrderSummaryResponse)
                .toList();

    }

    public List<OrderSummaryResponse> getPendingBranchOrders(UUID branchId){

        return orderRepository.findByBranchIdAndStatus(branchId, Order.Status.PAID)
                .stream()
                .map(this::toOrderSummaryResponse)
                .toList();

    }

    @Transactional
    public OrderResponse confirmDelivery(UUID branchId, ConfirmDeliveryRequest request){
        Order order = orderRepository.findByDeliveryPin(request.pin())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid PIN"));

        if (!order.getBranchId().equals(branchId))
            throw new UnauthorizedException("This PIN does not belong to your branch");
        if (order.getDeliveryPinUsed())
            throw new ConflictException("This PIN has already been used");
        if (LocalDateTime.now().isAfter(order.getDeliveryPinExpiry()))
            throw new ConflictException("This pin has already expired");
        if (order.getStatus() != Order.Status.PAID)
            throw new ConflictException("Order is not in paid Status");

        BigDecimal commission = order.getTotalPrice()
                .multiply(FREE_PLAN_COMMISSION_RATE);

        order.setStatus(Order.Status.DELIVERED);
        order.setDeliveryPinUsed(true);

        BigDecimal amountToRelease = order.getTotalPrice().subtract(commission);

        orderEventPublisher.publishDeliveryConfirmed(DeliveryConfirmedEvent.builder()
                .orderId(order.getId())
                .storeId(order.getStoreId())
                .branchId(order.getBranchId())
                .stripePaymentId(order.getStripePaymentId())
                .totalPrice(order.getTotalPrice())
                .commission(commission)
                .amountToRelease(amountToRelease)
                .build());

        return toOrderResponse(orderRepository.save(order));

    }

    public List<OrderSummaryResponse> getStoreOrders(UUID storeId){

        return orderRepository.findByStoreId(storeId)
                .stream()
                .map(this::toOrderSummaryResponse)
                .toList();

    }

    private String generatePin() {
        int pin = (int) (Math.random() * 900000) + 100000;
        return String.valueOf(pin);
    }

    private OrderResponse toOrderResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getId(),
                        item.getBookId(),
                        item.getQuantity(),
                        item.getPrice()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getBuyerKeycloakId(),
                order.getBranchId(),
                order.getStoreId(),
                order.getTotalPrice(),
                order.getStatus().name(),
                order.getPaymentStatus().name(),
                order.getShippingAddress(),
                // Only show PIN if order is PAID
                order.getStatus() == Order.Status.PAID
                        ? order.getDeliveryPin() : null,
                order.getDeliveryPinUsed(),
                order.getStripePaymentId(),
                itemResponses,
                order.getCreatedAt()
        );
    }

    private OrderSummaryResponse toOrderSummaryResponse(Order order) {
        return new OrderSummaryResponse(
                order.getId(),
                order.getBranchId(),
                order.getTotalPrice(),
                order.getStatus().name(),
                order.getPaymentStatus().name(),
                order.getCreatedAt()
        );
    }

}
