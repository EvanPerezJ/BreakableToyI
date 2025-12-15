export interface Product {
    id: number;
    name: string;      // En tu backend puede venir como productName, lo mapearemos
    category: string;
    price: number;     // En tu backend unitPrice
    inStock: boolean;
    stock: number;
    expiryDate: string | null; // En tu backend expDate
}

export interface Metric {
    name: string;
    totalProducts: number;
    totalValue: number;
    averageValue: number;
}

export interface ProductFilters {
    page: number;
    size: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    category: string;      // Backend espera "cat1,cat2"
    availability: string;  // 'All' | 'InStock' | 'OutofStock'
    search: string;
}

export interface PaginatedResponse<T> {
    products: T[];
    page: number;
    size: number;
    totalPages: number;
    totalProducts: number;
}