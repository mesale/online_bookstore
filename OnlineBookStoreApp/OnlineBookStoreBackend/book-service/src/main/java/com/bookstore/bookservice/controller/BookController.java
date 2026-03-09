package com.bookstore.bookservice.controller;

import com.bookstore.bookservice.dto.BookRequest;
import com.bookstore.bookservice.entity.Book;
import com.bookstore.bookservice.service.BookService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('SELLER')")
    public Book createBook(@RequestBody BookRequest request, @AuthenticationPrincipal Jwt jwt){
        String userId =jwt.getClaim("sub");
        return service.createBook(request, userId);
    }

    @GetMapping
    public List<Book> getBooks(){
        return service.getBooks();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public Book getBookById(@PathVariable long id){
        return service.getBook(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public Book updateBook(@PathVariable long id, @RequestBody BookRequest request, @AuthenticationPrincipal Jwt jwt){
        String userId = jwt.getClaim("sub");
        return service.updateBook(request, id, userId);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public void deleteBook(@PathVariable long id, @AuthenticationPrincipal Jwt jwt){
        String userId = jwt.getClaim("sub");
        service.deleteBook(id, userId);
    }

}
