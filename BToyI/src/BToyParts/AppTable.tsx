import { TableP } from '../products/TableP';
import { columns } from '../products/columns'; // Función que recibe updateSorting
import { useProducts } from '../products/productData';
import { CategoryDD } from './Dropdowns/CategoryDD';
import { AvailabilityDD } from './Dropdowns/AvailabilityDD';
import { Button } from '@/components/ui/button';
import ProductDialog from './ProductDialog/ProductDialog';
import Section from './Section';
import { columnsMetrics } from '@/metrics/ColumnsM';
import {TableM} from '../metrics/TableM';
import * as React from "react";

export default function AppTable() {
    const {
        products,
        loading,
        error,
        pagination,
        changePage,
        updateSorting,
        filterByCategory,
        filterByAvailability,
        clearFilters,
        refetch,
        selectedCategories,
        selectedAvailability,
        metrics,
        refetchMetrics,
    } = useProducts({
        page: 1,
        size: 10
    });

    // Manejar estados de loading y error
    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-gray-500">Cargando productos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-red-500">
                    Error al cargar productos: {error}
                    <button 
                        onClick={refetch}
                        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    // AQUÍ está la clave: pasar updateSorting a la función columns
    const tableColumns = columns(updateSorting);

    return (
        <div className="space-y-4">
            {/* Controles de filtros */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Showing {products.length} from {pagination.totalProducts} products founded.
                </div>
                
                <div className="flex items-center space-x-2">
                    {/* Componente de filtro por categoría */}
                    <CategoryDD     
                        selectedCategories={selectedCategories}
                        onCategoryChange={(categories) => filterByCategory(categories)}
                        products={products}
                    />
                    
                    {/* Componente de filtro por disponibilidad */}
                    <AvailabilityDD
                        selectedAvailability={selectedAvailability}
                        onAvailabilityChange={filterByAvailability}
                    />
                    
                    <Button variant="secondary"
                        onClick={clearFilters}
                        disabled={loading}
                    >
                        Reset filters
                    </Button>
                    
                    <ProductDialog/>
                </div>
            </div>

            {/* TableP con las columnas que YA tienen updateSorting */}
            <TableP
                data={products}
                columns={tableColumns} // ← Usar las columnas con updateSorting ya incluido
                page={pagination.page}
                totalPages={pagination.totalPages}
                setPage={changePage}
                totalProducts={pagination.totalProducts}
                pageSize={pagination.size}
                isLoading={loading}
                onSortChange={updateSorting} // También puedes pasarlo como prop si lo necesitas
                // Remover estos props ya que los filtros se manejan arriba
                // onCategoryFilter={filterByCategory}
                // onAvailabilityFilter={filterByAvailability}
                // onClearFilters={clearFilters}
            />

            <Section />
            
                <TableM
                    columns={columnsMetrics}
                    data={metrics}
                    error={error}
                    refetch={refetchMetrics}
                />

        </div>
    );
}