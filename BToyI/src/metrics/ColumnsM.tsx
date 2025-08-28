import type { ColumnDef, CellContext } from '@tanstack/react-table';

export type Metrics = {
    name: string;
    totalProducts: number;
    totalValue: number;
    averageValue: number;
};



export const columnsMetrics: ColumnDef<Metrics>[] = [
  {
    accessorKey: 'name',
    header: 'Category',
    cell: (info: CellContext<Metrics, unknown>) => info.getValue(),
  },
  {
    accessorKey: 'totalProducts',
    header: 'Total Products in stock',
    cell: (info: CellContext<Metrics, unknown>) => info.getValue(),
  },
  
{
  accessorKey: 'totalValue',
  header: 'Total Value in stock',
  cell: (info: CellContext<Metrics, unknown>) =>
    `$${Number(info.getValue()).toFixed(2)}`,
},
{
  accessorKey: 'averageValue',
  header: 'Average Value in stock',
  cell: (info: CellContext<Metrics, unknown>) =>
    `$${Number(info.getValue()).toFixed(2)}`,
},

];
