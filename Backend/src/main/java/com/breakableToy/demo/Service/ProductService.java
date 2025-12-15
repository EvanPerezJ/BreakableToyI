package com.breakableToy.demo.Service;

import com.breakableToy.demo.DTO.MetricDTO;
import com.breakableToy.demo.DTO.ProductDTO;
import com.breakableToy.demo.Entities.Product;
import com.breakableToy.demo.Exception.ResourceNotFoundException;
import com.breakableToy.demo.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> getProductsPaginated(int page, int size, String sortBy, String sortOrder, String category, String availability, String search) {
        List<Product> allProducts = repository.findAll();

        // 1. Filtrado
        List<Product> filtered = allProducts.stream()
                .filter(p -> filterByCategory(p, category))
                .filter(p -> filterByAvailability(p, availability))
                .filter(p -> filterBySearch(p, search))
                .collect(Collectors.toList());

        // 2. Ordenamiento
        sortProducts(filtered, sortBy, sortOrder);

        // 3. Paginación
        int totalProducts = filtered.size();
        int totalPages = (int) Math.ceil((double) totalProducts / size);
        if (totalProducts > 0 && totalPages == 0) totalPages = 1;
        
        int start = Math.min((page - 1) * size, totalProducts);
        int end = Math.min(start + size, totalProducts);
        if (start < 0) start = 0; // Corrección por si page es 0

        List<ProductDTO> content = filtered.subList(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("products", content);
        response.put("page", page);
        response.put("size", size);
        response.put("totalPages", totalPages);
        response.put("totalProducts", totalProducts);
        
        return response;
    }

    public ProductDTO getProductById(Long id) {
        return repository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public void createProduct(Product product) {
        repository.save(product);
    }

    public void updateProduct(Long id, Product updatedProduct) {
        Product existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
        if (updatedProduct.getName() != null) existing.setName(updatedProduct.getName());
        if (updatedProduct.getUnitPrice() != null) existing.setUnitPrice(updatedProduct.getUnitPrice());
        if (updatedProduct.getCategory() != null) existing.setCategory(updatedProduct.getCategory());
        if (updatedProduct.getStock() != 0) existing.setStock(updatedProduct.getStock());
        
        repository.save(existing);
    }
    
    public void updateStockStatus(Long id, boolean inStock, int quantity) {
         Product existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
         existing.setInStock(inStock);
         existing.setStock(quantity);
         repository.save(existing);
    }

    public void deleteProduct(Long id) {
        if (!repository.deleteById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Product not found.");
        }
    }

    public List<MetricDTO> getMetrics() {
        Map<String, List<Product>> byCategory = repository.findAll().stream()
                .collect(Collectors.groupingBy(Product::getCategory));

        return byCategory.entrySet().stream().map(entry -> {
            String catName = entry.getKey();
            List<Product> prods = entry.getValue();
            
            int totalStock = prods.stream().mapToInt(Product::getStock).sum();
            double totalValue = prods.stream().mapToDouble(p -> p.getUnitPrice() * p.getStock()).sum();
            double avgPrice = prods.stream().mapToDouble(Product::getUnitPrice).average().orElse(0.0);

            return new MetricDTO(catName, totalStock, totalValue, avgPrice);
        }).collect(Collectors.toList());
    }

    // --- Helpers Privados ---
    private ProductDTO convertToDTO(Product p) {
        return new ProductDTO(p.getId(), p.getName(), p.getCategory(), p.getUnitPrice(), p.isInStock(), p.getStock(), p.getExpDate());
    }

    private boolean filterByCategory(Product p, String category) {
        if (category == null || category.isEmpty()) return true;
        String[] cats = category.split(",");
        for (String c : cats) {
            if (p.getCategory().equalsIgnoreCase(c.trim())) return true;
        }
        return false;
    }

    private boolean filterByAvailability(Product p, String availability) {
        if ("All".equalsIgnoreCase(availability)) return true;
        boolean requiredStock = "InStock".equalsIgnoreCase(availability);
        return p.isInStock() == requiredStock;
    }

    private boolean filterBySearch(Product p, String search) {
         if (search == null || search.trim().isEmpty()) return true;
         return p.getName() != null && p.getName().toLowerCase().contains(search.toLowerCase());
    }

    private void sortProducts(List<Product> list, String sortBy, String sortOrder) {
        if (sortBy == null || sortBy.isEmpty()) return;
        
        Comparator<Product> comparator = switch (sortBy) {
            case "name" -> Comparator.comparing(Product::getName, String.CASE_INSENSITIVE_ORDER);
            case "price" -> Comparator.comparing(Product::getUnitPrice);
            case "stock" -> Comparator.comparing(Product::getStock);
            case "expiryDate" -> Comparator.comparing(Product::getExpDate, Comparator.nullsLast(Comparator.naturalOrder()));
            default -> null;
        };
        
        if (comparator != null) {
            if ("desc".equalsIgnoreCase(sortOrder)) comparator = comparator.reversed();
            list.sort(comparator);
        }
    }
}