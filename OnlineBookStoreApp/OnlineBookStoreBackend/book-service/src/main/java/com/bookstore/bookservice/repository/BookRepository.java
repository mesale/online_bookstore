package com.bookstore.bookservice.repository;

import com.bookstore.bookservice.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<Book, Long> {
}
