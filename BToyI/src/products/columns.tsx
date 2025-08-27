
import type { ColumnDef } from '@tanstack/react-table';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ProductDD from '../BToyParts/Dropdowns/ProductDD';
import { IoMdArrowDown } from 'react-icons/io';
import { IoMdArrowUp } from 'react-icons/io';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export type Product = {
    id: number;
    name: string; // Cambié de productName a name para coincidir con la API
    category: string;
    price: number; // Cambié de unitPrice a price para coincidir con la API
    inStock: boolean;
    stock: number;
    expiryDate: string; // Cambié de expDate a expiryDate para coincidir con la API
}

// Helper function para crear headers con sorting
const createSortableHeader = (title: string, columnId: string) => {
    return ({ column }: any) => {
        const isSorted = column.getIsSorted();
        const SortingIcon = isSorted === "asc" 
            ? IoMdArrowUp // Cambié el orden de los iconos
            : isSorted === "desc" 
                ? IoMdArrowDown 
                : ArrowUpDown;

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" aria-label={`Sort by ${title}`}>
                        {title}
                        <SortingIcon className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' side='bottom'>
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <IoMdArrowUp className="mr-2 h-4 w-4"/>
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <IoMdArrowDown className="mr-2 h-4 w-4"/>
                        Desc
                    </DropdownMenuItem> 
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };
};

export const columns: ColumnDef<Product>[] = [
    {
        id: 'select',
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
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
        enableSorting: false, // Generalmente no ordenamos por ID desde la UI
    },
    {
        accessorKey: 'name',
        header: createSortableHeader('Name', 'name'),
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'category',
        header: createSortableHeader('Category', 'category'),
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'price',
        header: createSortableHeader('Price', 'price'),
        cell: info => `$${Number(info.getValue()).toFixed(2)}`, // Mejor formato para precio
    },
    {
        accessorKey: 'stock',
        header: createSortableHeader('Stock', 'stock'),
        cell: info => Number(info.getValue()).toLocaleString(), // Formato numérico
    },
    {
        accessorKey: 'expiryDate',
        header: createSortableHeader('Expiry Date', 'expiryDate'),
        cell: info => {
            const date = new Date(info.getValue() as string);
            return date.toLocaleDateString(); // Formato de fecha más legible
        },
    },
    {
        accessorKey: 'inStock',
        header: 'In Stock',
        cell: info => info.getValue() ? 
            <FaCheck className="text-green-500 mx-auto"/> : 
            <IoClose className="text-red-500 mx-auto"/>,
        enableSorting: false, // Generalmente filtramos en lugar de ordenar booleanos
    },
    {
        id: "actions",
        header: 'Actions',
        cell: ({ row }) => {
            return <ProductDD row={row} />;
        },
        enableSorting: false,
    },
];