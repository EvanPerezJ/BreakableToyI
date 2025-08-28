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
        productList.add(new Products(1L, "Product A", 10.0f, "Category 1", "2024-12-31", 100,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(2L, "Product B", 20.0f, "Category 2", "2025-01-15", 200,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(3L, "Product C", 30.0f, "Category 3", "2025-02-28", 300,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(4L, "Product D", 40.0f, "Category 4", "2025-03-31", 400,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(5L, "Product E", 50.0f, "Category 5", "2025-04-30", 500,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(6L, "Product F", 60.0f, "Category 6", "2025-05-31", 600,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(7L, "Product G", 70.0f, "Category 7", "2025-06-30", 700,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(8L, "Product H", 80.0f, "Category 8", "2025-07-31", 800,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(9L, "Product I", 90.0f, "Category 9", "2025-08-30", 900,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(10L, "Product J", 100.0f, "Category 10", "2025-09-30", 1000,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(11L, "Product K", 110.0f, "Category 11", "2025-10-31", 1100,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(12L, "Product L", 120.0f, "Category 12", "2025-11-30", 1200,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(13L, "Product M", 130.0f, "Category 13", "2025-12-31", 1300,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(14L, "Product N", 140.0f, "Category 14", "2026-01-31", 1400,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(15L, "Product O", 150.0f, "Category 15", "2026-02-28", 1500,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(16L, "Product P", 160.0f, "Category 16", "2026-03-31", 1600,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(17L, "Product Q", 170.0f, "Category 17", "2026-04-30", 1700,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(18L, "Product R", 180.0f, "Category 18", "2026-05-31", 1800,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(19L, "Product S", 190.0f, "Category 19", "2026-06-30", 1900,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(20L, "Product T", 200.0f, "Category 20", "2026-07-31", 2000,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(21L, "Product U", 210.0f, "Category 21", "2026-08-30", 2100,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(22L, "Product V", 220.0f, "Category 22", "2026-09-30", 2200,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(23L, "Product W", 230.0f, "Category 23", "2026-10-31", 2300,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(24L, "Product X", 240.0f, "Category 24", "2026-11-30", 2400,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(25L, "Product Y", 250.0f, "Category 25", "2026-12-31", 2500,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(26L, "Product Z", 260.0f, "Category 26", "2027-01-31", 2600,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(27L, "Product AA", 270.0f, "Category 27", "2027-02-28", 2700,false,"2023-10-01","2023-10-01"));
        productList.add(new Products(28L, "Product AB", 280.0f, "Category 28", "2027-03-31", 2800,true,"2023-10-01","2023-10-01"));
        productList.add(new Products(29L, "Product AC", 290.0f, "Category 29", "2027-04-30", 2900,false,"2023-10-01","2023-10-01"));
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
