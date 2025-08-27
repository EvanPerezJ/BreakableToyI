import { TableP } from '../products/TableP';
import { columns } from '../products/columns'; // Función que recibe updateSorting
import { useProducts } from '../products/productData';

export default function AppTable() {
    const {
        products,
        loading,
        error,
        pagination,
        changePage,
        changePageSize,
        updateSorting, // ← Esta función necesita pasarse a las columnas
        filterByCategory,
        filterByAvailability,
        clearFilters,
        refetch
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
            {/* Controles opcionales */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Mostrando {products.length} de {pagination.totalProducts} productos
                </div>
                
                <div className="flex items-center space-x-2">
                    <select 
                        value={pagination.size} 
                        onChange={(e) => changePageSize(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                        disabled={loading}
                    >
                        <option value={5}>5 por página</option>
                        <option value={10}>10 por página</option>
                        <option value={20}>20 por página</option>
                        <option value={50}>50 por página</option>
                    </select>
                    
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
                onPageSizeChange={changePageSize}
                onCategoryFilter={filterByCategory}
                onAvailabilityFilter={filterByAvailability}
                onClearFilters={clearFilters}
            />
        </div>
    );
}