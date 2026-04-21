package com.bookstore.bookservice.service;

import com.bookstore.bookservice.dto.BookDto.*;
import com.bookstore.bookservice.entity.Book;
import com.bookstore.bookservice.exception.ConflictException;
import com.bookstore.bookservice.exception.ResourceNotFoundException;
import com.bookstore.bookservice.exception.UnauthorizedException;
import com.bookstore.bookservice.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {

    private final BookRepository bookRepository;
    private final MinioService minioService;

    public Page<BookSummaryResponse> getApprovedBooks(Pageable pageable){

        return bookRepository
                .findByApprovedTrue(pageable)
                .map(this::toBookSummaryResponse);

    }

    public Page<BookSummaryResponse> getApprovedBooksByCategory(String category, Pageable pageable){

        return bookRepository
                .findByApprovedTrueAndCategory(category, pageable)
                .map(this::toBookSummaryResponse);

    }

    public Page<BookSummaryResponse> searchBooks(String title, Pageable pageable){

        return bookRepository
                .findByApprovedTrueAndTitleContainingIgnoreCase(title, pageable)
                .map(this::toBookSummaryResponse);

    }

    public BookResponse  getBookById(UUID bookId){

         Book book = bookRepository.
                 findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found"));

         return toBookResponse(book);

    }

    public BookResponse createBookAsOwner(String keycloakId, UUID storeId,
                                          CreateBookRequest request, MultipartFile image){
        Book book = Book.builder()
                .createdBy(storeId)
                .branchId(request.branchId())
                .storeId(storeId)
                .title(request.title())
                .author(request.author())
                .description(request.description())
                .category(request.category())
                .price(request.price())
                .condition(request.condition())
                .approved(true)
                .build();

        if (image != null && !image.isEmpty()){
            String objectName = "books/" + UUID.randomUUID() + "/"
                    + image.getOriginalFilename();
            minioService.uploadImage(image, objectName);
            book.setImageUrl(minioService.getImageUrl(objectName));
        }

        return toBookResponse(bookRepository.save(book));

    }

    public BookResponse updateBookAsOwner(String keycloakId, UUID bookId, UUID storeId,
                                          UpdateBookRequest request, MultipartFile image){

        Book book = bookRepository.findByIdAndStoreId(bookId, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        book.setTitle(request.title());
        book.setAuthor(request.author());
        book.setDescription(request.description());
        book.setCategory(request.category());
        book.setPrice(request.price());
        book.setCondition(request.condition());

        if (image != null && !image.isEmpty()){
            if (book.getImageUrl()!= null){
                String oldObjectName = extractObjectName(book.getImageUrl());
                minioService.deleteImage(oldObjectName);
            }
            String objectName = "books/" + UUID.randomUUID() + "/"
                    + image.getOriginalFilename();
            minioService.uploadImage(image, objectName);
            book.setImageUrl(minioService.getImageUrl(objectName));
        }

        return toBookResponse(bookRepository.save(book));

    }

    public void deleteBookAsOwner(String keycloakId, UUID storeId, UUID bookId){

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        if (book.getImageUrl() != null)
            minioService.deleteImage(extractObjectName(book.getImageUrl()));

        bookRepository.delete(book);

    }

    public List<BookResponse> getStoreBooks(UUID storeId){
        return bookRepository
                .findByStoreId(storeId)
                .stream()
                .map(this::toBookResponse)
                .toList();
    }

    public BookResponse createBookAsEmployee(String keycloakId, UUID branchId,
                                             UUID storeId, CreateBookRequest request, MultipartFile image) {

        // Employee can only add books to their own branch
        if (!request.branchId().equals(branchId)) {
            throw new UnauthorizedException(
                    "You can only add books to your assigned branch");
        }

        Book book = Book.builder()
                .createdBy(branchId)
                .branchId(branchId)
                .storeId(storeId)
                .title(request.title())
                .author(request.author())
                .description(request.description())
                .category(request.category())
                .price(request.price())
                .condition(request.condition())
                .approved(false)
                .build();

        if (image != null && !image.isEmpty()) {
            String objectName = "books/" + UUID.randomUUID() + "/"
                    + image.getOriginalFilename();
            minioService.uploadImage(image, objectName);
            book.setImageUrl(minioService.getImageUrl(objectName));
        }

        return toBookResponse(bookRepository.save(book));
    }

    public BookResponse updateBookAsEmployee(String keycloakId, UUID branchId,
                                             UUID bookId, UpdateBookRequest request, MultipartFile image) {

        Book book = bookRepository.findByIdAndBranchId(bookId, branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        book.setTitle(request.title());
        book.setAuthor(request.author());
        book.setDescription(request.description());
        book.setCategory(request.category());
        book.setPrice(request.price());
        book.setCondition(request.condition());

        if (image != null && !image.isEmpty()) {
            if (book.getImageUrl() != null) {
                minioService.deleteImage(extractObjectName(book.getImageUrl()));
            }
            String objectName = "books/" + UUID.randomUUID() + "/"
                    + image.getOriginalFilename();
            minioService.uploadImage(image, objectName);
            book.setImageUrl(minioService.getImageUrl(objectName));
        }

        return toBookResponse(bookRepository.save(book));
    }

    public void deleteBookAsEmployee(UUID branchId, UUID bookId) {
        Book book = bookRepository.findByIdAndBranchId(bookId, branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        if (book.getImageUrl() != null) {
            minioService.deleteImage(extractObjectName(book.getImageUrl()));
        }

        bookRepository.delete(book);
    }

    public List<BookResponse> getBranchBooks(UUID branchId) {
        return bookRepository.findByBranchId(branchId)
                .stream()
                .map(this::toBookResponse)
                .toList();
    }

    public Page<BookResponse> getUnapprovedBooksForStore(Pageable pageable){

        return bookRepository
                .findByApprovedFalse(pageable)
                .map(this::toBookResponse);

    }

    public BookResponse approveBookAsOwner(UUID storeId, UUID bookId){

        Book book = bookRepository.findByIdAndStoreId(bookId, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        book.setApproved(true);

        return toBookResponse(bookRepository.save(book));

    }

    public void rejectBookAsOwner(UUID storeId, UUID bookId){

        Book book = bookRepository.findByIdAndStoreId(bookId, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        if(book.isApproved())
            throw new ConflictException("Cannot reject already approved book");

        if(book.getImageUrl() != null)
            minioService.deleteImage(extractObjectName(book.getImageUrl()));

        bookRepository.delete(book);

    }

    public void removeBookAsAdmin(UUID bookId){

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        if (book.getImageUrl() != null)
            minioService.deleteImage(extractObjectName(book.getImageUrl()));

        bookRepository.delete(book);

    }

    private String extractObjectName(String imageUrl) {
        // URL format: http://localhost:9000/bucket-name/books/uuid/filename.jpg
        // We need: books/uuid/filename.jpg
        return imageUrl.substring(imageUrl.indexOf("books/"));
    }

    private BookResponse toBookResponse(Book book) {

        return new BookResponse(
                book.getId(),
                book.getCreatedBy(),
                book.getBranchId(),
                book.getStoreId(),
                book.getTitle(),
                book.getAuthor(),
                book.getDescription(),
                book.getCategory(),
                book.getPrice(),
                book.getCondition().name(),
                book.getImageUrl(),
                book.isApproved(),
                book.getCreatedAt()
        );

    }

    private BookSummaryResponse toBookSummaryResponse(Book book) {

        return new BookSummaryResponse(
                book.getId(),
                book.getBranchId(),
                book.getTitle(),
                book.getAuthor(),
                book.getCategory(),
                book.getPrice(),
                book.getCondition().name(),
                book.getImageUrl()
        );

    }
}
