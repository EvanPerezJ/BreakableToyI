import { TableP } from '../products/TableP';
import { columns } from '../products/columns'; // Función que recibe updateSorting
import { useProducts } from '../products/productData';
import { CategoryDD } from '../components/CategoryDD';
import { AvailabilityDD } from '../components/AvailabilityDD';
import * as React from "react";

export default function AppTable() {
    const {
        products,
        loading,
        error,
        pagination,
        changePage,
        updateSorting, // ← Esta función necesita pasarse a las columnas
        filterByCategory,
        filterByAvailability,
        clearFilters,
        refetch,
        // Estados para los filtros actuales
        selectedCategories,
        selectedAvailability
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
                    Mostrando {products.length} de {pagination.totalProducts} productos
                </div>
                
                <div className="flex items-center space-x-2">
                    {/* Componente de filtro por categoría */}
                    <CategoryDD
                        selectedCategories={selectedCategories}
                        onCategoryChange={filterByCategory}
                        products={products}
                    />
                    
                    {/* Componente de filtro por disponibilidad */}
                    <AvailabilityDD
                        selectedAvailability={selectedAvailability}
                        onAvailabilityChange={filterByAvailability}
                    />
                    
                    <button 
                        onClick={clearFilters}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        disabled={loading}
                    >
                        Limpiar filtros
                    </button>
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
        </div>
    );
}