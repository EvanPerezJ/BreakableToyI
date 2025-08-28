import type { ColumnDef } from '@tanstack/react-table';

export type Metrics = {
    name: string; // Cambié de productName a name para coincidir con la API
    totalProducts: number;
    totalValue: number; // Cambié de unitPrice a price para coincidir con la API
}

export const columnsMetrics: ColumnDef<Metrics>[] = [
    {
        accessorKey: 'name',
        header: 'Product Name',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'totalProducts',
        header: 'Total Products in stock',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'totalValue',
        header: 'Total Value in stock',
        cell: (info) => `$${info.getValue()}`, // Formateo del precio con un símbolo de dólar
    },
    {
        accessorKey: 'averageValue',
        header: 'Average Value in stock',
        cell: info => `$${info.getValue()}`, // Formateo del precio con un símbolo de dólar
    },
];