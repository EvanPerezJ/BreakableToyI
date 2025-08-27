import type { ColumnDef } from '@tanstack/react-table';
//import {ReactNode} from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ProductDD from '../BToyParts/Dropdowns/ProductDD';
import { IoMdArrowDown} from 'react-icons/io';
import { IoMdArrowUp} from 'react-icons/io';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export type Product = {
    id: number;
    productName: string;
    category: string;
    unitPrice: number;
    inStock: boolean;
    stock: number;
    expDate: string;
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
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            const SortingIcon = isSorted === "asc" 
                ? IoMdArrowDown
                : isSorted === "desc" 
                    ? IoMdArrowUp 
                    : ArrowUpDown;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="Sort by Product Name">
                            Name
                            <SortingIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' side='bottom'>
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <IoMdArrowUp className="mr-2 h-4 w-4"/>
                            Asc
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <IoMdArrowDown className="mr-2 h-4 w-4"/>
                            Desc
                        </DropdownMenuItem> 
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorKey: 'category',
        header:({ column }) => {
            const isSorted = column.getIsSorted();
            const SortingIcon = isSorted === "asc" 
                ? IoMdArrowDown
                : isSorted === "desc" 
                    ? IoMdArrowUp 
                    : ArrowUpDown;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="Sort by Product Name">
                            Category
                            <SortingIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' side='bottom'>
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <IoMdArrowUp className="mr-2 h-4 w-4"/>
                            Asc
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <IoMdArrowDown className="mr-2 h-4 w-4"/>
                            Desc
                        </DropdownMenuItem> 
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            const SortingIcon = isSorted === "asc" 
                ? IoMdArrowDown
                : isSorted === "desc" 
                    ? IoMdArrowUp 
                    : ArrowUpDown;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="Sort by Product Name">
                            Price
                            <SortingIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' side='bottom'>
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <IoMdArrowUp className="mr-2 h-4 w-4"/>
                            Asc
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <IoMdArrowDown className="mr-2 h-4 w-4"/>
                            Desc
                        </DropdownMenuItem> 
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: info => `$${info.getValue()}`,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            const SortingIcon = isSorted === "asc" 
                ? IoMdArrowDown
                : isSorted === "desc" 
                    ? IoMdArrowUp 
                    : ArrowUpDown;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="Sort by Product Name">
                            Stock
                            <SortingIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' side='bottom'>
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <IoMdArrowUp className="mr-2 h-4 w-4"/>
                            Asc
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <IoMdArrowDown className="mr-2 h-4 w-4"/>
                            Desc
                        </DropdownMenuItem> 
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorKey: 'expiryDate',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            const SortingIcon = isSorted === "asc" 
                ? IoMdArrowDown
                : isSorted === "desc" 
                    ? IoMdArrowUp 
                    : ArrowUpDown;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="Sort by Product Name">
                            Expiry Date
                            <SortingIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' side='bottom'>
                        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                            <IoMdArrowUp className="mr-2 h-4 w-4"/>
                            Asc
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                            <IoMdArrowDown className="mr-2 h-4 w-4"/>
                            Desc
                        </DropdownMenuItem> 
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        id: "actions",
        header: 'Actions',
        cell: ({ row }) => {
            return <ProductDD row={row} />;
        }
    },
    {
        accessorKey: 'inStock',
        header: 'In Stock',
        cell: info => info.getValue() ? <FaCheck className="text-green-500 mx-auto"/> : <IoClose className="text-red-500 mx-auto"/>,
        footer: props => props.column.id,
    },

];



