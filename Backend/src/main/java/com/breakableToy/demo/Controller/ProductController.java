package com.breakableToy.demo.Controller;

import com.breakableToy.demo.DTO.MetricDTO;
import com.breakableToy.demo.DTO.ProductDTO;
import com.breakableToy.demo.Entities.Product;
import com.breakableToy.demo.Service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products") // Prefijo para todos los endpoints
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "All") String availability,
            @RequestParam(required = false) String search) {
        
        return ResponseEntity.ok(productService.getProductsPaginated(page, size, sortBy, sortOrder, category, availability, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
    
    @GetMapping("/metrics")
    public ResponseEntity<List<MetricDTO>> getMetrics() {
        return ResponseEntity.ok(productService.getMetrics());
    }

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        productService.createProduct(product);
        return ResponseEntity.status(201).body("Product added successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        productService.updateProduct(id, product);
        return ResponseEntity.ok("Product updated successfully");
    }

    // Endpoints específicos de Stock refactorizados para usar el servicio
    @PostMapping("/{id}/outofstock")
    public ResponseEntity<String> outOfStockProduct(@PathVariable Long id) {
        productService.updateStockStatus(id, false, 0);
        return ResponseEntity.ok("Product updated successfully");
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<String> inStockProduct(@PathVariable Long id) {
        productService.updateStockStatus(id, true, 10);
        return ResponseEntity.ok("Product updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}