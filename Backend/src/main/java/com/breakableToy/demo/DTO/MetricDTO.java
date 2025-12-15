package com.breakableToy.demo.DTO;

public class MetricDTO {
    private String name; // Nombre de la categoría
    private int totalProducts; // Stock total
    private double totalValue;
    private double averageValue;

    public MetricDTO(String name, int totalProducts, double totalValue, double averageValue) {
        this.name = name;
        this.totalProducts = totalProducts;
        this.totalValue = totalValue;
        this.averageValue = averageValue;
    }

    // Getters
    public String getName() { return name; }
    public int getTotalProducts() { return totalProducts; }
    public double getTotalValue() { return totalValue; }
    public double getAverageValue() { return averageValue; }
}