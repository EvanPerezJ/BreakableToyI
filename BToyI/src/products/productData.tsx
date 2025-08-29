import { useState, useEffect } from 'react';
import type { Product } from "./columns";
import type { Metrics } from "../metrics/ColumnsM"; 

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
    search?: string;
    availability?: 'All' | 'InStock' | 'OutOfStock' | string;
}

// Configuración de la API
const API_URL = "http://localhost:9090";

const fetchProductsFromAPI = async (params: ProductsParams): Promise<ProductApiResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.size) queryParams.append('size', params.size.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.category) queryParams.append('category', params.category);
    if (params.availability) queryParams.append('availability', params.availability);
    if (params.search) queryParams.append('search', params.search);


    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
};


export async function fetchProducts(page: number = 1, size: number = 10): Promise<ProductApiResponse> {
    return fetchProductsFromAPI({ page, size });
}

//HOOK

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
        search:'',
        ...initialParams
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);

    const [metrics, setMetrics] = useState<Metrics[]>([]);
    const [metricsLoading, setMetricsLoading] = useState(false);
    const [metricsError, setMetricsError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
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

    const fetchMetrics = async () => {
        setMetricsLoading(true);
        setMetricsError(null);
        try {
            const res = await fetch(`${API_URL}/metrics`);
            if (!res.ok) throw new Error("Error fetching metrics");
            const data = await res.json();
            setMetrics(data);
        } catch (err: unknown) {
            setMetricsError(err instanceof Error ? err.message : "Unknown error fetching metrics");
        } finally {
            setMetricsLoading(false);
        }
    };

    const updateParams = (newParams: Partial<ProductsParams>) => {
        setParams(prev => ({ ...prev, ...newParams }));
    };

    const changePage = (newPage: number) => {
        updateParams({ page: newPage });
    };

    const changePageSize = (newSize: number) => {
        updateParams({ size: newSize, page: 1 });
    };

    const updateSorting = (columnId: string, direction: 'asc' | 'desc') => {
        const columnMapping: Record<string, string> = {
            name: 'name',
            category: 'category',
            price: 'price',
            stock: 'stock',
            expiryDate: 'expiryDate'
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
        setSelectedCategories(categories);
        updateParams({
            category: categories.length > 0 ? categories.join(',') : '',
            page: 1
        });
    };

    const filterByAvailability = (availability: string | null) => {
        let apiAvailability: string;
        switch (availability) {
            case 'InStock':
                apiAvailability = 'InStock';
                setSelectedAvailability('InStock');
                break;
            case 'OutofStock':
                apiAvailability = 'OutOfStock';
                setSelectedAvailability('OutofStock');
                break;
            case 'All':
            case null:
            default:
                apiAvailability = 'All';
                setSelectedAvailability(null);
                break;
        }
        updateParams({
            availability: apiAvailability,
            page: 1
        });
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedAvailability(null);
        updateParams({
            sortBy: '',
            sortOrder: 'asc',
            category: '',
            availability: 'All',
            page: 1
        });
    };

    // Efecto para cargar productos cuando cambian los parámetros
    useEffect(() => {
        console.log("Params changed:", params);
        fetchData();
    }, [params]);

    // Efecto para cargar métricas una sola vez
    useEffect(() => {
    fetchMetrics();
    }, [products]);

    const [searchTerm] = useState('');

    const updateSearch = (term: string) => {
        setParams((prev) => ({
            ...prev,
            search: term,
            page: 1,
        }));
    };

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
        refetch: fetchData,
        searchTerm,
        updateSearch,
        selectedCategories,
        selectedAvailability,
        metrics,
        metricsLoading,
        metricsError,
        refetchMetrics: fetchMetrics
    };
};


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

  const getProductById = async (id: number): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  };

  return {
    addProduct,
    updateProduct,
    deleteProduct,
    setProductOutOfStock,
    setProductInStock,
    getProductById
  };
};