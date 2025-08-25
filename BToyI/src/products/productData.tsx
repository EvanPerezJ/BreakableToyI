import type { Product } from "./columns";
import axios from "axios";

export interface ProductApiResponse {
    products: Product[];
    page: number;
    size: number;
    totalPages: number;
    totalProducts: number;
}

// Ajusta la URL según tu backend
const API_URL = "http://localhost:9090/products";

export async function fetchProducts(page: number = 1, size: number = 10): Promise<ProductApiResponse> {
    const response = await axios.get<ProductApiResponse>(API_URL, {
        params: { page, size }
    });

    // Ya no agregamos el icono, solo devolvemos los datos tal cual
    return response.data;
}

