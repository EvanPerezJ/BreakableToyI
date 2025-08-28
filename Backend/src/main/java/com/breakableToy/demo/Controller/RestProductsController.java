package com.breakableToy.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.ArrayList;
import com.breakableToy.demo.Entities.Products;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.HashMap;
import java.util.Map;
import java.util.Comparator;

@RestController
@CrossOrigin(origins = "*")


public class RestProductsController {


    
    private static final List<Products> productList = new ArrayList<>();

    static {
        productList.add(new Products(1L, "Smartphone", 12.03f, "Electronics", "2025-12-31", 28,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(2L, "Laptop", 90.22f, "Electronics", "2025-12-31", 9,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(3L, "Tablet", 99.11f, "Electronics", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(4L, "Camera", 46.94f, "Electronics", "2025-12-31", 26,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(5L, "Headphones", 44.94f, "Electronics", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));

        productList.add(new Products(6L, "Novel", 74.49f, "Books", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(7L, "Biography", 98.26f, "Books", "2025-12-31", 6,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(8L, "Textbook", 79.57f, "Books", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(9L, "Comics", 43.83f, "Books", "2025-12-31", 15,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(10L, "Manual", 26.38f, "Books", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));

        productList.add(new Products(11L, "T-Shirt", 46.74f, "Clothing", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(12L, "Jeans", 64.75f, "Clothing", "2025-12-31", 23,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(13L, "Jacket", 48.97f, "Clothing", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(14L, "Dress", 20.58f, "Clothing", "2025-12-31", 27,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(15L, "Sweater", 96.35f, "Clothing", "2025-12-31", 12,true,"2023-10-01","2023-10-01"));

        productList.add(new Products(16L, "Puzzle", 25.95f, "Toys", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(17L, "Action Figure", 57.58f, "Toys", "2025-12-31", 1,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(18L, "Board Game", 83.57f, "Toys", "2025-12-31", 8,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(19L, "Doll", 5.58f, "Toys", "2025-12-31", 24,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(20L, "Lego", 54.81f, "Toys", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));

        productList.add(new Products(21L, "Apple", 88.44f, "Groceries", "2025-12-31", 0,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(22L, "Bread", 57.24f, "Groceries", "2025-12-31", 19,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(23L, "Milk", 26.06f, "Groceries", "2025-12-31", 8,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(24L, "Cheese", 58.28f, "Groceries", "2025-12-31", 19,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(25L, "Juice", 21.39f, "Groceries", "2025-12-31", 1,true,"2023-10-01","2023-10-01"));
    }

    @GetMapping("/")
    public String home() {
        return " Saludos desde el controlador RestProductsController";
    }

    @GetMapping("/metrics")
public List<Map<String, Object>> getMetricsByCategory() {
    Map<String, Map<String, Object>> categoryMetrics = new HashMap<>();

    for (Products product : productList) {
        String category = product.getCategory();
        Map<String, Object> metric = categoryMetrics.getOrDefault(category, new HashMap<>());

        int stock = product.getStock();
        float totalValue = product.getUnitPrice() * stock;

        // Inicializar si es la primera vez
        if (!metric.containsKey("name")) {
            metric.put("name", category);
            metric.put("totalProducts", 0);
            metric.put("totalValue", 0.0f);
            metric.put("averageValue", 0.0f);
            metric.put("productCount", 0); // para promedio
        }

        // Sumar valores
        metric.put("totalProducts", (int) metric.get("totalProducts") + stock);
        metric.put("totalValue", (float) metric.get("totalValue") + totalValue);
        metric.put("averageValue", (float) metric.get("averageValue") + product.getUnitPrice());
        metric.put("productCount", (int) metric.get("productCount") + 1);

        categoryMetrics.put(category, metric);
        }

        // Calcular promedio y preparar resultado
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map<String, Object> metric : categoryMetrics.values()) {
            int count = (int) metric.get("productCount");
            float avg = count > 0 ? ((float) metric.get("averageValue")) / count : 0.0f;
            metric.put("averageValue", avg);
            metric.remove("productCount"); // quitar campo auxiliar
            result.add(metric);
        }

        return result;
}

    @GetMapping("/products")
    public Map<String, Object> getProductsPaginated(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "All") String availability) {

        // 1. Filtrado por categorías (pueden ser varias) y disponibilidad
        List<Products> filteredList = new ArrayList<>(productList);

        // Filtrar por varias categorías
        if (category != null && !category.isEmpty()) {
            String[] categories = category.split(",");
            for (int i = 0; i < categories.length; i++) {
                categories[i] = categories[i].trim();
            }
            filteredList.removeIf(p -> {
                boolean found = false;
                for (String cat : categories) {
                    if (p.getCategory().equalsIgnoreCase(cat)) {
                        found = true;
                        break;
                    }
                }
                return !found;
            });
        }

        // Filtrar por disponibilidad
        if (!"All".equalsIgnoreCase(availability)) {
            boolean inStock = "InStock".equalsIgnoreCase(availability);
            filteredList.removeIf(p -> p.isInStock() != inStock);
        }

        // 2. Ordenamiento
        if (sortBy != null && !sortBy.isEmpty()) {
            Comparator<Products> comparator = null;
            switch (sortBy) {
                case "name":
                    comparator = Comparator.comparing(Products::getProductName, String.CASE_INSENSITIVE_ORDER);
                    break;
                case "category":
                    comparator = Comparator.comparing(Products::getCategory, String.CASE_INSENSITIVE_ORDER);
                    break;
                case "price":
                    comparator = Comparator.comparing(Products::getUnitPrice);
                    break;
                case "stock":
                    comparator = Comparator.comparing(Products::getStock);
                    break;
                case "expiryDate":
                    comparator = Comparator.comparing(Products::getExpDate);
                    break;
            }
            if (comparator != null) {
                if ("desc".equalsIgnoreCase(sortOrder)) {
                    comparator = comparator.reversed();
                }
                filteredList.sort(comparator);
            }
        }

        int totalProducts = filteredList.size();
        int totalPages = (int) Math.ceil((double) totalProducts / size);

        if (totalProducts > 0 && totalPages == 0) {
            totalPages = 1;
        }

        if (page < 1 || (totalPages > 0 && page > totalPages)) {
            Map<String, Object> response = new HashMap<>();
            response.put("products", new ArrayList<>());
            response.put("page", page);
            response.put("size", size);
            response.put("totalPages", totalPages);
            response.put("totalProducts", totalProducts);
            return response;
        }

        int inicio = (page - 1) * size;
        int fin = Math.min(inicio + size, totalProducts);

        List<Map<String, Object>> paginatedProducts = new ArrayList<>();
        for (Products product : filteredList.subList(inicio, fin)) {
            paginatedProducts.add(productToMap(product));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("products", paginatedProducts);
        response.put("page", page);
        response.put("size", size);
        response.put("totalPages", totalPages);
        response.put("totalProducts", totalProducts);

        return response;
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

    private Map<String, Object> productToMap(Products product) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", product.getId());
        map.put("name", product.getProductName());
        map.put("category", product.getCategory());
        map.put("price", product.getUnitPrice());
        map.put("inStock", product.isInStock());
        map.put("stock", product.getStock());
        map.put("expiryDate", product.getExpDate());
        return map;
    }
}
