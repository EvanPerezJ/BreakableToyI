import { TableP } from '../products/TableP';
import { columns } from '../products/columns';
import { useProducts } from '../products/productData';

export default function AppTable() {
    // Usar el hook que está en productData.tsx
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
        refetch
    } = useProducts({
        page: 1,
        size: 10,
        sortBy: '',
        sortOrder: 'asc',
        availability: 'All'
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

    return (
        <div className="space-y-4">
            {/* Controles opcionales - puedes quitarlos si no los quieres */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    {pagination.totalProducts} products found.
                </div>
                
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={refetch}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>

            {/* Tu componente TableP original */}
            <TableP
                data={products}
                columns={columns(updateSorting)}
                page={pagination.page}
                totalPages={pagination.totalPages}
                setPage={changePage}
                // Props adicionales si quieres expandir TableP más tarde
                totalProducts={pagination.totalProducts}
                pageSize={pagination.size}
                isLoading={loading}
                onSortChange={updateSorting}
                onCategoryFilter={filterByCategory}
                onAvailabilityFilter={filterByAvailability}
                onClearFilters={clearFilters}
            />
        </div>
    );
}