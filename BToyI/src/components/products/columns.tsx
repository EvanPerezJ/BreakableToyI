import React from 'react';
import type { ColumnDef, Row, CellContext } from '@tanstack/react-table';
import ProductDD from './dropdowns/ProductDD';
import SortingDD from './dropdowns/SortingDD';
import { CheckboxManager } from './CheckboxManager';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/product';

const formatCurrency = (value: number | null | undefined) =>
  value === undefined || value === null ? 'N/A' : `$${value.toFixed(2)}`;

// Aceptamos updateSorting y refetch para que AppTable pueda pasar ambos (updateSorting no se pasa a SortingDD porque SortingDD lee del contexto)
export const columns = (
  updateSorting: (colId: string) => void,
  refetch: () => Promise<void>
): ColumnDef<Product, unknown>[] => [
  {
    id: 'select',
    cell: ({ row }: { row: Row<Product> }) => <CheckboxManager refetch={refetch} row={row} />,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    // header no necesita recibir el column si SortingDD usa el contexto
    header: () => <SortingDD title="Name" columnId="name" />,
    cell: (ctx: CellContext<Product, unknown>) => {
      const name = ctx.getValue() as string | undefined;
      const stock = ctx.row.original?.stock as number | undefined;
      return (
        <span style={{ textDecoration: (stock ?? 0) === 0 ? 'line-through' : 'none' }}>
          {name ?? '—'}
        </span>
      );
    },
  },
  {
    accessorKey: 'category',
    header: () => <SortingDD title="Category" columnId="category" />,
    cell: (ctx: CellContext<Product, unknown>) => {
      const val = ctx.getValue() as string | undefined;
      return val ?? '—';
    },
  },
  {
    accessorKey: 'price',
    header: () => <SortingDD title="Price" columnId="price" />,
    cell: (ctx: CellContext<Product, unknown>) => {
      const value = ctx.getValue() as number | undefined;
      return formatCurrency(value);
    },
  },
  {
    accessorKey: 'stock',
    header: () => <SortingDD title="Stock" columnId="stock" />,
    cell: (ctx: CellContext<Product, unknown>) => {
      const stock = ctx.getValue() as number | undefined;
      const label = stock === undefined ? '—' : String(stock);
      const variant =
        (stock ?? 0) > 10 ? 'success' : (stock ?? 0) > 0 ? 'default' : 'destructive';
      return <Badge className={`badge-${variant}`}>{label}</Badge>;
    },
  },
  {
    accessorKey: 'expiryDate',
    header: () => <SortingDD title="Expiry" columnId="expiryDate" />,
    cell: (ctx: CellContext<Product, unknown>) => {
      const dt = ctx.getValue() as string | undefined;
      return dt ? new Date(dt).toLocaleDateString() : '—';
    },
  },
  {
    accessorKey: 'inStock',
    header: () => <SortingDD title="Available" columnId="inStock" />,
    cell: (ctx: CellContext<Product, unknown>) => {
      const val = ctx.getValue() as boolean | undefined;
      return val === undefined ? '—' : val ? 'Yes' : 'No';
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: { row: Row<Product> }) => <ProductDD row={row} />,
  },
];