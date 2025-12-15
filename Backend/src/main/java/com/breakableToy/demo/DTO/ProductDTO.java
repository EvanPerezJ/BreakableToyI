package com.breakableToy.demo.DTO;

import java.time.LocalDate;

public class ProductDTO {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private boolean inStock;
    private int stock;
    private LocalDate expiryDate;

    public ProductDTO(Long id, String name, String category, Double price, boolean inStock, int stock, LocalDate expiryDate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.inStock = inStock;
        this.stock = stock;
        this.expiryDate = expiryDate;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public Double getPrice() { return price; }
    public boolean isInStock() { return inStock; }
    public int getStock() { return stock; }
    public LocalDate getExpiryDate() { return expiryDate; }
}