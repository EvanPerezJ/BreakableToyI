
import type { ColumnDef } from '@tanstack/react-table';
//import {ReactNode} from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import type { IconType } from 'react-icons';

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
    stock: number;
    expiryDate: string
    icon: IconType;
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'select',
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
                aria-label="Select all rows"
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                aria-label={`Select row ${row.index + 1}`}
            />
        ),
        footer: props => props.column.id,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: info => `$${info.getValue()}`,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'inStock',
        header: 'In Stock',
        cell: info => info.getValue() ? <FaCheck className="text-green-500 mx-auto"/> : <IoClose className="text-red-500 mx-auto"/>,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorKey: 'expiryDate',
        header: 'Expiry Date',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    }
];



