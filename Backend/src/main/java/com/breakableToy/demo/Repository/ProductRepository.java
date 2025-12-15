package com.breakableToy.demo.Repository;

import com.breakableToy.demo.Entities.Product;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepository {

    private final List<Product> productList = new ArrayList<>();

    public ProductRepository() {
        initData();
    }

    private void initData() {
        // Fechas parseadas correctamente y números como Double
        LocalDate defaultDate = LocalDate.parse("2023-10-01");
        
        productList.add(new Product(1L, "Smartphone", 12.0, "Electronics", LocalDate.parse("2025-12-31"), 28, true, defaultDate, defaultDate));
        productList.add(new Product(2L, "Laptop", 90.0, "Electronics", LocalDate.parse("2025-12-03"), 9, true, defaultDate, defaultDate));
        productList.add(new Product(3L, "Tablet", 99.0, "Electronics", LocalDate.parse("2025-12-31"), 0, false, defaultDate, defaultDate));
        productList.add(new Product(4L, "Wireless Headphones", 59.99, "Electronics", LocalDate.parse("2025-11-30"), 15, true, defaultDate, defaultDate));
        productList.add(new Product(5L, "Bluetooth Speaker", 45.0, "Electronics", LocalDate.parse("2025-10-15"), 25, true, defaultDate, defaultDate));
        productList.add(new Product(6L, "Desk Lamp", 22.5, "Home", LocalDate.parse("2026-01-01"), 40, true, defaultDate, defaultDate));
        productList.add(new Product(7L, "Coffee Maker", 79.0, "Home", LocalDate.parse("2025-09-30"), 8, true, defaultDate, defaultDate));
        productList.add(new Product(8L, "Running Shoes", 120.0, "Sports", LocalDate.parse("2025-12-15"), 12, true, defaultDate, defaultDate));
        productList.add(new Product(9L, "Yoga Mat", 25.0, "Sports", LocalDate.parse("2025-12-31"), 30, true, defaultDate, defaultDate));
        productList.add(new Product(10L, "Cookware Set", 150.0, "Home", LocalDate.parse("2026-03-01"), 5, true, defaultDate, defaultDate));
        productList.add(new Product(11L, "Gaming Mouse", 35.0, "Electronics", LocalDate.parse("2025-12-31"), 20, true, defaultDate, defaultDate));
        productList.add(new Product(12L, "Office Chair", 199.99, "Furniture", LocalDate.parse("2026-06-30"), 3, true, defaultDate, defaultDate));
        productList.add(new Product(13L, "Water Bottle", 12.0, "Groceries", LocalDate.parse("2025-12-31"), 50, true, defaultDate, defaultDate));
        productList.add(new Product(21L, "Apple", 88.0, "Groceries", LocalDate.parse("2025-12-31"), 0, false, defaultDate, defaultDate));
    }

    public List<Product> findAll() {
        return new ArrayList<>(productList);
    }

    public Optional<Product> findById(Long id) {
        return productList.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    public Product save(Product product) {
        if (product.getId() == null) {
            long newId = productList.stream().mapToLong(Product::getId).max().orElse(0) + 1;
            product.setId(newId);
        } else {
            deleteById(product.getId()); 
        }
        productList.add(product);
        return product;
    }

    public boolean deleteById(Long id) {
        return productList.removeIf(p -> p.getId().equals(id));
    }
}