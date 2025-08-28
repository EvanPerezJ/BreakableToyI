import type { ColumnDef } from '@tanstack/react-table';

export type Metrics = {
    name: string; // Cambié de productName a name para coincidir con la API
    totalProducts: number;
    totalValue: number; // Cambié de unitPrice a price para coincidir con la API
}