package com.bookstore.bookservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String author;

    private String isbn;

    private double price;

    private Integer stock;

    private String description;

    //keycloakId
    private String createdBy;

    public Book(){}

}
