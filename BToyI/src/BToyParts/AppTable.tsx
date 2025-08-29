import { TableP } from '../products/TableP';
import { columns } from '../products/columns';
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
        params,
        changePage,
        updateSorting,
        updateSearch,
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

    // Error and states managing
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

    const tableColumns = columns(updateSorting,refetch);

    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Showing {products.length} from {pagination.totalProducts} products founded.
                </div>
                
                <div className="flex items-center space-x-2">

                    <CategoryDD     
                        selectedCategories={selectedCategories}
                        onCategoryChange={(categories) => filterByCategory(categories)}
                        products={products}
                    />
                    
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
                    
                    <ProductDialog refetch={refetch}/>
                </div>
            </div>

            
            <TableP
                data={products}
                columns={tableColumns} 
                page={pagination.page}
                totalPages={pagination.totalPages}
                setPage={changePage}
                totalProducts={pagination.totalProducts}
                pageSize={pagination.size}
                isLoading={loading}
                onSortChange={updateSorting}
                updateSearch={updateSearch}
                searchTerm={params.search}
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