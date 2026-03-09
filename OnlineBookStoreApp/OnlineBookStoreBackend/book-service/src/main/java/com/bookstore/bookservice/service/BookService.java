package com.bookstore.bookservice.service;

import com.bookstore.bookservice.dto.BookRequest;
import com.bookstore.bookservice.entity.Book;
import com.bookstore.bookservice.repository.BookRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public Book createBook(BookRequest request, String userID){

        Book book = new Book();
        book.setCreatedBy(userID);
        applyRequestToBook(request, book);
        repository.save(book);
        return book;
    }

    public List<Book> getBooks(){
        return repository.findAll().stream().toList();
    }

    public Book getBook(long id){

        Optional<Book> result = repository.findById(id);
        if(result.isPresent())
            return result.get();

        throw new RuntimeException("User not found");
    }

    public Book updateBook(BookRequest request, long id, String userId){
        Book book = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        if(book.getCreatedBy().equals(userId)){
            applyRequestToBook(request, book);
            repository.save(book);
            return book;
        }

        throw new RuntimeException("Unauthorized to edit this book");

    }

    public void deleteBook(long id, String userId){
        Book book = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        if(book.getCreatedBy().equals(userId))
            repository.deleteById(id);
        else
            throw new RuntimeException("Unauthorized to delete this book");
    }

    private void applyRequestToBook(BookRequest request, Book book){
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setStock(request.getStock());
        book.setPrice(request.getPrice());
        book.setDescription(request.getDescription());
    }
}
