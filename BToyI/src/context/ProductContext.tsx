import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { Product, Metric, ProductFilters } from '../types/product';

export interface ProductContextType {
  // Datos
  products: Product[];
  metrics: Metric[];
  pagination: {
    page: number;
    totalPages: number;
    totalProducts: number;
  };
  isLoading: boolean;
  error: string | null;

  // Filtros
  filters: ProductFilters;
  setFilters: Dispatch<SetStateAction<ProductFilters>>;
  
  // SOLUCIÓN AL ANY: Usamos un genérico K que extiende las llaves de ProductFilters.
  // Esto obliga a que el 'value' corresponda al tipo correcto de la 'key'.
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;

  // Acciones / helpers de UI
  changePage: (page: number) => void;
  updateSorting: (columnId: string) => void;
  updateSearch: (term: string) => void;
  filterByCategory: (category: string) => void;
  // Usamos el tipo exacto de availability definido en tu interfaz
  filterByAvailability: (availability: ProductFilters['availability']) => void;
  clearFilters: () => void;

  // Acciones (async)
  refreshProducts: () => Promise<void>;
  refreshMetrics: () => Promise<void>;
  refetch: () => Promise<void>;
  refetchMetrics: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;

  // util
  selectedCategory: string | undefined; // Puede ser undefined si no hay filtro
  selectedAvailability: ProductFilters['availability'];
}

// Creamos el contexto pero NO lo exportamos con valor inicial null para forzar el uso del Provider
export const ProductContext = createContext<ProductContextType | null>(null);