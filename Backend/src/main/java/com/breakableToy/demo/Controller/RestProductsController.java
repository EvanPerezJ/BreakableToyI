package com.breakableToy.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    }

    @GetMapping("/")
    public String home() {
        return " Saludos desde el controlador RestProductsController";
    }

    @GetMapping("/products")
    public List<Products> getProducts() {
        return productList;
    }

    @GetMapping("/products/{page}")
    public List<Products> getProductsByPage(@PathVariable int page) {
        int tamPag = 2; // Puedes ajustar el tamaño de página aquí
        int inicio = (page - 1) * tamPag;
        int fin = Math.min(inicio + tamPag, productList.size());
        if (inicio >= productList.size() || page < 1) {
            return new ArrayList<>();
        }
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
                product.setProductName(updatedProduct.getProductName());
                product.setUnitPrice(updatedProduct.getUnitPrice());
                product.setCategory(updatedProduct.getCategory());
                product.setExpDate(updatedProduct.getExpDate());
                product.setStock(updatedProduct.getStock());
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


}
