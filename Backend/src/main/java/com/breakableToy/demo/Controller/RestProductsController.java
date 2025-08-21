package com.breakableToy.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.ArrayList;
import com.breakableToy.demo.Entities.Products;
import org.springframework.web.bind.annotation.RequestBody;

@RestController



public class RestProductsController {
    
    private static final List<Products> productList = new ArrayList<>();

    static {
        productList.add(new Products(1L, "Product A", 10.0f, "Category 1", "2024-12-31", 100));
        productList.add(new Products(2L, "Product B", 20.0f, "Category 2", "2025-01-15", 200));
        productList.add(new Products(3L, "Product C", 30.0f, "Category 3", "2025-02-28", 300));
        productList.add(new Products(4L, "Product D", 40.0f, "Category 4", "2025-03-31", 400));
        productList.add(new Products(5L, "Product E", 50.0f, "Category 5", "2025-04-30", 500));
        productList.add(new Products(6L, "Product F", 60.0f, "Category 6", "2025-05-31", 600));
        productList.add(new Products(7L, "Product G", 70.0f, "Category 7", "2025-06-30", 700));
        productList.add(new Products(8L, "Product H", 80.0f, "Category 8", "2025-07-31", 800));
        productList.add(new Products(9L, "Product I", 90.0f, "Category 9", "2025-08-30", 900));
        productList.add(new Products(10L, "Product J", 100.0f, "Category 10", "2025-09-30", 1000));
        productList.add(new Products(11L, "Product K", 110.0f, "Category 11", "2025-10-31", 1100));
        productList.add(new Products(12L, "Product L", 120.0f, "Category 12", "2025-11-30", 1200));
        productList.add(new Products(13L, "Product M", 130.0f, "Category 13", "2025-12-31", 1300));
        productList.add(new Products(14L, "Product N", 140.0f, "Category 14", "2026-01-31", 1400));
        productList.add(new Products(15L, "Product O", 150.0f, "Category 15", "2026-02-28", 1500));
        productList.add(new Products(16L, "Product P", 160.0f, "Category 16", "2026-03-31", 1600));
        productList.add(new Products(17L, "Product Q", 170.0f, "Category 17", "2026-04-30", 1700));
        productList.add(new Products(18L, "Product R", 180.0f, "Category 18", "2026-05-31", 1800));
        productList.add(new Products(19L, "Product S", 190.0f, "Category 19", "2026-06-30", 1900));
        productList.add(new Products(20L, "Product T", 200.0f, "Category 20", "2026-07-31", 2000));
        productList.add(new Products(21L, "Product U", 210.0f, "Category 21", "2026-08-30", 2100));
        productList.add(new Products(22L, "Product V", 220.0f, "Category 22", "2026-09-30", 2200));
        productList.add(new Products(23L, "Product W", 230.0f, "Category 23", "2026-10-31", 2300));
        productList.add(new Products(24L, "Product X", 240.0f, "Category 24", "2026-11-30", 2400));
        productList.add(new Products(25L, "Product Y", 250.0f, "Category 25", "2026-12-31", 2500));
        productList.add(new Products(26L, "Product Z", 260.0f, "Category 26", "2027-01-31", 2600));
        productList.add(new Products(27L, "Product AA", 270.0f, "Category 27", "2027-02-28", 2700));
    }

    @GetMapping("/")
    public String home() {
        return " Saludos desde el controlador RestProductsController";
    }

    @GetMapping("/products")
    public List<Products> getProductsPaginated(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        int totalProducts = productList.size();
        int totalPages = (int) Math.ceil((double) totalProducts / size);
        
        // Verificar que la página sea válida
        if (page < 1 || page > totalPages) {
            return new ArrayList<>();
        }
        
        int inicio = (page - 1) * size;
        int fin = Math.min(inicio + size, totalProducts);
        
        return productList.subList(inicio, fin);
    }


    @PostMapping("/products")
    public String addProduct(@RequestBody Products product) {
        Long id = productList.stream().mapToLong(Products::getId).max().orElse(0) + 1;
        product.setId(id);
        productList.add(product);
        return "Product added successfully";
    }

    @PostMapping("/products/{id}/outofstock")
    public String outOfStockProduct(@PathVariable Long id) {
        for (Products product : productList) {
            if (product.getId().equals(id)) {
                product.setInStock(false);
                return "Product updated successfully";
            }
        }
        return "Product not found";
    }

    @PutMapping("/products/{id}")
    public String updateProduct(@PathVariable Long id, @RequestBody Products updatedProduct) {
        for (Products product : productList) {
            if (product.getId().equals(id)) {
                if (updatedProduct.getProductName() != null) {
                    product.setProductName(updatedProduct.getProductName());
                }
                if (updatedProduct.getUnitPrice() != 0.0f) {
                    product.setUnitPrice(updatedProduct.getUnitPrice());
                }
                if (updatedProduct.getCategory() != null) {
                    product.setCategory(updatedProduct.getCategory());
                }
                if (updatedProduct.getExpDate() != null) {
                    product.setExpDate(updatedProduct.getExpDate());
                }
                if (updatedProduct.getStock() != 0) {
                    product.setStock(updatedProduct.getStock());
                }
                return "Product updated successfully";
            }
        }
        return "Product not found";
    }

    @PutMapping("/products/{id}/instock")
    public String inStockProduct(@PathVariable Long id) {
        for (Products product : productList) {
            if (product.getId().equals(id)) {
                product.setInStock(true);
                return "Product updated successfully";
            }
        }
        return "Product not found";
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {
        boolean removed = productList.removeIf(product -> product.getId().equals(id));
        return removed ? "Product deleted successfully" : "Product not found";
    }

}
