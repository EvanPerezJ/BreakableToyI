import * as React from "react";
import { useProducts } from '@/hooks/useProducts'; 
import { TableP } from '@/components/products/TableP'; 
import { columns } from '@/components/products/columns'; 
import { Button } from '@/components/ui/button';

// Importamos los componentes LIMPIOS que acabamos de crear arriba
import { CategoryDD } from './dropdowns/CategoryDD';
import { AvailabilityDD } from './dropdowns/AvailabilityDD';
import AddProductDialog from './Dialog/EditDialog'; 

export default function ProductSection() {
    const {
        products,
        pagination,
        isLoading,
        error,
        changePage,
        updateSorting,
        updateSearch,
        clearFilters,
        refetch,
        filters
    } = useProducts();

    // Memoizamos las columnas pasando updateSorting y refetch
    const tableColumns = React.useMemo(() => columns(updateSorting, refetch), [updateSorting, refetch]);

    if (error) return <div className="text-red-500 p-5 border border-red-200">Error: {error}</div>;

    return (
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm border">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-500 font-medium">
                   Total Products: {pagination.totalProducts}
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                    {/* Componentes inteligentes (sin props) */}
                    <CategoryDD />
                    <AvailabilityDD />
                    
                    <Button variant="secondary" onClick={clearFilters}>
                        Reset
                    </Button>
                    
                    <AddProductDialog />
                </div>
            </div>

            {/* Tabla */}
            <TableP
                data={products}
                columns={tableColumns} 
                page={pagination.page}
                totalPages={pagination.totalPages}
                setPage={changePage}
                totalProducts={pagination.totalProducts}
                isLoading={isLoading}
                updateSearch={updateSearch}
                searchTerm={filters.search}
            />
        </div>
    );
}