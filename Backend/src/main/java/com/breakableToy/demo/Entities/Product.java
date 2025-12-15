package com.breakableToy.demo.Entities;

import java.time.LocalDate;

// 1. Cambio de nombre: De Products (plural) a Product (singular)
public class Product {

    // 2. Usamos Long (Wrapper) para permitir nulos en IDs nuevos
    private Long id;
    
    // 3. Renombrado para simplificar (productName -> name)
    private String name;
    
    // 4. Usamos Double en lugar de float (mejor precisión estándar)
    //    Si prefieres estrictamente float, cambia "Double" por "Float"
    private Double unitPrice;
    
    private String category;
    
    // 5. LocalDate es vital para poder ordenar por fechas correctamente
    private LocalDate expDate;
    
    private int stock;
    private boolean inStock;
    
    // Usamos LocalDate también para fechas de auditoría
    private LocalDate createdDate;
    private LocalDate modifiedDate;

    // Constructor vacío
    public Product() {
    }

    // Constructor completo
    public Product(Long id, String name, Double unitPrice, String category, LocalDate expDate, int stock, boolean inStock, LocalDate createdDate, LocalDate modifiedDate) {
        this.id = id;
        this.name = name;
        this.unitPrice = unitPrice;
        this.category = category;
        this.expDate = expDate;
        this.stock = stock;
        this.inStock = inStock;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    // Constructor conveniente (sin fechas de expiración explícitas, por ejemplo)
    public Product(Long id, String name, Double unitPrice, String category, int stock, boolean inStock, LocalDate createdDate, LocalDate modifiedDate) {
        this(id, name, unitPrice, category, null, stock, inStock, createdDate, modifiedDate);
    }

    // --- Getters y Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getExpDate() {
        return expDate;
    }

    public void setExpDate(LocalDate expDate) {
        this.expDate = expDate;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDate modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}