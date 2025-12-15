import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { ProductContext } from './ProductContext'; // Importamos el contexto creado arriba
import { productService } from '../services/productService';
import type { Product, Metric, ProductFilters, PaginatedResponse } from '../types/product';

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalProducts: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultFilters: ProductFilters = {
    page: 1,
    size: 10,
    sortBy: 'id',
    sortOrder: 'asc',
    availability: 'All', // Asegúrate que 'All' está en tu type ProductFilters
    category: '',
    search: ''
  };

  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);

  // --- Lógica de Carga ---

  const fetchProducts = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data: PaginatedResponse<Product> = await productService.getAll(filters);
      setProducts(Array.isArray(data?.products) ? data.products : []);
      setPagination({
        page: data?.page ?? filters.page ?? 1,
        totalPages: data?.totalPages ?? 1,
        totalProducts: data?.totalProducts ?? 0
      });
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
      setProducts([]);
      setPagination({ page: 1, totalPages: 1, totalProducts: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const fetchMetrics = useCallback(async (): Promise<void> => {
      try {
          const data = await productService.getMetrics();
          setMetrics(Array.isArray(data) ? data : []);
      } catch (e) {
          console.error("Error loading metrics", e);
      }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
      void fetchMetrics();
  }, [fetchMetrics]);

  // --- Helpers Type-Safe ---

  // Implementación del genérico: TypeScript ahora sabe que value es correcto
  const updateFilter = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const changePage = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const updateSearch = (term: string) => {
    setFilters(prev => ({ ...prev, search: term, page: 1 }));
  };

  const filterByCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category, page: 1 }));
  };

  const filterByAvailability = (availability: ProductFilters['availability']) => {
    setFilters(prev => ({ ...prev, availability, page: 1 }));
  };

  const updateSorting = (columnId: string) => {
    setFilters(prev => {
      if (prev.sortBy === columnId) {
        return { ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc', page: 1 };
      }
      return { ...prev, sortBy: columnId, sortOrder: 'asc', page: 1 };
    });
  };

  const clearFilters = () => {
    // Mantenemos el tamaño de página actual, reseteamos lo demás
    setFilters(prev => ({ ...defaultFilters, size: prev.size ?? defaultFilters.size }));
  };

  const deleteProduct = async (id: number): Promise<void> => {
      try {
          await productService.delete(id);
          await fetchProducts();
          await fetchMetrics();
      } catch (error) {
          console.error("Error deleting", error);
          throw error;
      }
  };

  const refetch = async (): Promise<void> => { await fetchProducts(); };
  const refetchMetrics = async (): Promise<void> => { await fetchMetrics(); };

  return (
    <ProductContext.Provider value={{
      products,
      metrics,
      pagination,
      isLoading,
      error,
      filters,
      setFilters,
      updateFilter,
      changePage,
      updateSorting,
      updateSearch,
      filterByCategory,
      filterByAvailability,
      clearFilters,
      refreshProducts: fetchProducts,
      refreshMetrics: fetchMetrics,
      refetch,
      refetchMetrics,
      deleteProduct,
      selectedCategory: filters.category,
      selectedAvailability: filters.availability
    }}>
      {children}
    </ProductContext.Provider>
  );
};