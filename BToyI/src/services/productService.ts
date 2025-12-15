import axios from 'axios';
import type { Product, ProductFilters, PaginatedResponse, Metric } from '../types/product';

const API_URL = "http://localhost:9090/api";

// 1. Definimos la estructura EXACTA que viene del Backend (Java Entity)
// Esto elimina el 'any' al recibir datos.
interface BackendProduct {
    id: number;
    productName?: string; // Springboot usa productName
    name?: string;        // Fallback por si acaso
    category: string;
    unitPrice?: number;   // Springboot usa unitPrice
    price?: number;       // Fallback
    inStock: boolean;
    stock: number;
    expDate?: string;     // Springboot usa expDate
    expiryDate?: string;  // Fallback
}

// 2. Mapeador: Backend (Java) -> Frontend (React)
const mapToFrontend = (data: BackendProduct): Product => ({
    id: data.id,
    name: data.productName || data.name || 'Unknown',
    category: data.category,
    price: data.unitPrice ?? data.price ?? 0,
    inStock: data.inStock,
    stock: data.stock,
    expiryDate: data.expDate || data.expiryDate || null
});

// 3. Mapeador Inverso: Frontend (React) -> Backend (Java)
// Usamos esto antes de crear o actualizar para enviar los nombres correctos
const mapToBackend = (product: Partial<Product>): Partial<BackendProduct> => {
    return {
        // Si product.name existe, lo mandamos como productName
        productName: product.name,
        unitPrice: product.price,
        category: product.category,
        stock: product.stock,
        inStock: product.inStock,
        expDate: product.expiryDate || undefined // Spring prefiere null/undefined si está vacío
    };
};

export const productService = {
    getAll: async (filters: ProductFilters): Promise<PaginatedResponse<Product>> => {
        const params = new URLSearchParams();
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.size) params.append('size', filters.size.toString());
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters.category) params.append('category', filters.category);
        if (filters.availability && filters.availability !== 'All') params.append('availability', filters.availability);
        if (filters.search) params.append('search', filters.search);

        // Tipamos la respuesta de Axios esperando la estructura paginada del backend
        const response = await axios.get<PaginatedResponse<BackendProduct>>(`${API_URL}/products?${params.toString()}`);
        
        // Convertimos cada item del backend al formato del frontend
        const content = response.data.products.map(mapToFrontend);
        
        // Devolvemos la estructura limpia
        return { 
            ...response.data, 
            products: content 
        };
    },

    getMetrics: async (): Promise<Metric[]> => {
        const response = await axios.get<Metric[]>(`${API_URL}/products/metrics`);
        return response.data;
    },

    // Para crear, recibimos un producto sin ID
    create: async (product: Omit<Product, 'id'>): Promise<void> => {
        // Convertimos nuestros datos limpios al formato sucio que quiere Java
        const payload = mapToBackend(product);
        await axios.post(`${API_URL}/products`, payload);
    },

    // Para actualizar, recibimos un parcial
    update: async (id: number, product: Partial<Product>): Promise<void> => {
        const payload = mapToBackend(product);
        await axios.put(`${API_URL}/products/${id}`, payload);
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/products/${id}`);
    },

    setOutOfStock: async (id: number): Promise<void> => {
        await axios.post(`${API_URL}/products/${id}/outofstock`);
    },

    setInStock: async (id: number): Promise<void> => {
        await axios.put(`${API_URL}/products/${id}/instock`);
    },
    
    getById: async (id: number): Promise<Product> => {
        const response = await axios.get<BackendProduct>(`${API_URL}/products/${id}`);
        return mapToFrontend(response.data);
    }
};