import { useState, useEffect } from 'react';
import type { Product } from "./columns";

export interface ProductApiResponse {
    products: Product[];
    page: number;
    size: number;
    totalPages: number;
    totalProducts: number;
}

export interface ProductsParams {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
    availability?: 'All' | 'InStock' | 'OutOfStock';
}

// Configuración de la API
const API_URL = "http://localhost:9090";

// Función interna para hacer el fetch (reemplaza tu axios)
const fetchProductsFromAPI = async (params: ProductsParams): Promise<ProductApiResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.size) queryParams.append('size', params.size.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.category) queryParams.append('category', params.category);
    if (params.availability) queryParams.append('availability', params.availability);

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
};

// MANTÉN TU FUNCIÓN ORIGINAL PARA COMPATIBILIDAD
export async function fetchProducts(page: number = 1, size: number = 10): Promise<ProductApiResponse> {
    return fetchProductsFromAPI({ page, size });
}

// NUEVO HOOK QUE INTERNAMENTE USA LA MISMA LÓGICA
export const useProducts = (initialParams: ProductsParams = {}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        totalPages: 0,
        totalProducts: 0
    });

    const [params, setParams] = useState<ProductsParams>({
        page: 1,
        size: 10,
        sortBy: '',
        sortOrder: 'asc',
        category: '',
        availability: 'All',
        ...initialParams
    });

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Usa la misma lógica interna de fetch
            const data = await fetchProductsFromAPI(params);
            
            setProducts(data.products);
            setPagination({
                page: data.page,
                size: data.size,
                totalPages: data.totalPages,
                totalProducts: data.totalProducts
            });
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    // Funciones para controlar el hook
    const updateParams = (newParams: Partial<ProductsParams>) => {
        setParams((prev: ProductsParams) => ({ ...prev, ...newParams }));
    };

    const changePage = (newPage: number) => {
        updateParams({ page: newPage });
    };

    const changePageSize = (newSize: number) => {
        updateParams({ size: newSize, page: 1 });
    };

    const updateSorting = (columnId: string, direction: 'asc' | 'desc') => {
        const columnMapping: { [key: string]: string } = {
            'name': 'name',
            'category': 'category', 
            'price': 'price',
            'stock': 'stock',
            'expiryDate': 'expiryDate'
        };

        const apiColumnName = columnMapping[columnId];
        if (apiColumnName) {
            updateParams({
                sortBy: apiColumnName,
                sortOrder: direction,
                page: 1
            });
        }
    };

    const filterByCategory = (categories: string[]) => {
        updateParams({ 
            category: categories.join(','),
            page: 1 
        });
    };

    const filterByAvailability = (availability: 'All' | 'InStock' | 'OutOfStock') => {
        updateParams({ 
            availability,
            page: 1 
        });
    };

    const clearFilters = () => {
        updateParams({
            sortBy: '',
            sortOrder: 'asc',
            category: '',
            availability: 'All',
            page: 1
        });
    };

    // Effect para fetch cuando cambien los parámetros
    useEffect(() => {
        fetchData();
    }, [params.page, params.size, params.sortBy, params.sortOrder, params.category, params.availability]);

    return {
        products,
        loading,
        error,
        pagination,
        params,
        updateSorting,
        changePage,
        changePageSize,
        filterByCategory,
        filterByAvailability,
        clearFilters,
        refetch: fetchData
    };
};

// FUNCIONES ADICIONALES DE UTILIDAD (puedes expandir más tarde)
export const useProductActions = () => {
    const addProduct = async (product: Omit<Product, 'id'>) => {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
        
        return await response.text();
    };

    const updateProduct = async (id: number, product: Partial<Product>) => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        
        return await response.text();
    };

    const deleteProduct = async (id: number) => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        
        return await response.text();
    };

    const setProductOutOfStock = async (id: number) => {
        const response = await fetch(`${API_URL}/products/${id}/outofstock`, {
            method: 'POST'
        });
        
        if (!response.ok) {
            throw new Error('Failed to set product out of stock');
        }
        
        return await response.text();
    };

    const setProductInStock = async (id: number) => {
        const response = await fetch(`${API_URL}/products/${id}/instock`, {
            method: 'PUT'
        });
        
        if (!response.ok) {
            throw new Error('Failed to set product in stock');
        }
        
        return await response.text();
    };

    return {
        addProduct,
        updateProduct,
        deleteProduct,
        setProductOutOfStock,
        setProductInStock
    };
};