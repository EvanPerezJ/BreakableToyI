import * as React from "react";
import { useProducts } from '@/hooks/useProducts'; 
import { TableM } from '@/components/metrics/TableM';
import { columnsMetrics } from '@/components/metrics/ColumnsM'; // Asegúrate de la ruta
import Section from '@/components/products/Section';

export default function MetricsSection() {
    const { metrics, refetchMetrics } = useProducts();

    return (
        <div className="space-y-4 mt-8">
            <Section />
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <TableM
                    columns={columnsMetrics}
                    data={metrics}
                    error={null}
                    refetch={refetchMetrics}
                />
            </div>
        </div>
    );
}