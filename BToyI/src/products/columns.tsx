
import type { ColumnDef } from '@tanstack/react-table';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ProductDD from '../BToyParts/Dropdowns/ProductDD';
import SortingDD from '../BToyParts/Dropdowns/SortingDD';
import { CheckboxManager } from './CheckboxManager';
import {Badge} from '@/components/ui/badge'



export type Product = {
    id: number;
    productName: string; 
    category: string;
    unitPrice: number; 
    inStock: boolean;
    stock: number;
    expDate: string | null;
}


export const columns = (updateSorting: (col: string, dir: 'asc' | 'desc') => void, refetch: ()=> Promise<void>): ColumnDef<Product>[] => [
    

    {    
      id: 'select',
      header: '',
      cell: ({ row }) => <CheckboxManager refetch={refetch} row={row} />,
      enableSorting: false,
      enableHiding: false,

    },
    {
      accessorKey: 'id',
      header: 'ID',
      cell: info => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <SortingDD title="Name" columnId="name" column={column} updateSorting={updateSorting}/>
      ),
      cell: info => {
          const name = info.getValue() as string;
          const stock = info.row.original.stock;
          return (
            <span style={{ textDecoration: stock === 0 ? 'line-through' : 'none' }}>
              {name}
            </span>
          );
        },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <SortingDD title="Category" columnId="category" column={column} updateSorting={updateSorting}/>
      ),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <SortingDD title="Price" columnId="price" column={column} updateSorting={updateSorting}/>
      ),
      cell: info => `$${Number(info.getValue()).toFixed(2)}`,
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => (
        <SortingDD title="Stock" columnId="stock" column={column} updateSorting={updateSorting}/>
      ),  
      cell: info => {
          const stock = info.getValue() as number;
          let variant: "success" | "destructive" | "secondary"  = "success";

          if (stock < 5) variant = "destructive"; 
          else if (stock >= 5 && stock <= 10) variant = "secondary"; 

          return (
            <Badge variant={variant}>
              {stock.toLocaleString()}
            </Badge>
          );
        },

    },
    {
      accessorKey: 'expiryDate',
      header: ({ column }) => (
        <SortingDD title="Expiry Date" columnId="expiryDate" column={column} updateSorting={updateSorting}/>
      ),
      
      cell: info => {
          const value = info.getValue() as string | null;
          if (!value) return <span>NULL</span>;
          let variant: "success" | "destructive" | "secondary"  = "success";

          const date = new Date(value);
          const today = new Date();
          const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          if (diffDays < 7) variant = 'destructive'; 
          else if (diffDays >= 7 && diffDays <= 14) variant = 'secondary'; 
          else if (diffDays > 14) variant = 'success'; 

          return (
            <Badge variant={variant}>
              {date.toISOString().split('T')[0]}
            </Badge>
          );
        },


    },
    {
      accessorKey: 'inStock',
      header: 'In Stock',
      cell: info =>
        info.getValue() ? (
          <FaCheck className="text-green-500 mx-auto" />
        ) : (
          <IoClose className="text-red-500 mx-auto" />
        ),
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ProductDD refetch={refetch} row={row} />,
      enableSorting: false,
    },
  ];