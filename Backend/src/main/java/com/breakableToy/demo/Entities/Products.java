package com.breakableToy.demo.Entities;

public class Products {
    private long id;
    private String productName;
    private float unitPrice;
    private String category;
    private String expDate;
    private int stock;
    private boolean inStock;
    private String createdDate;
    private String modifiedDate;

    public Products(){
    }

    public Products(Long id, String productName, float unitPrice, String category, String expDate, int stock, boolean inStock, String createdDate, String modifiedDate) {
        this.id = id;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.category = category;
        this.expDate = expDate;
        this.stock = stock;
        this.inStock = inStock;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Products(Long id, String productName, float unitPrice, String category, int stock, boolean inStock, String createdDate, String modifiedDate) {
        this(id, productName, unitPrice, category, null, stock, inStock, createdDate, modifiedDate);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getExpDate() {
        return expDate;
    }

    public void setExpDate(String expDate) {
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

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(String modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

}
