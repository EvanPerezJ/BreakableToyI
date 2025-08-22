import type { Product } from "./columns";
import {MdInventory} from 'react-icons/md';

export const productData: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        category: 'Category A',
        price: 29.99,
        inStock: true,
        stock: 100,
        expiryDate: '2024-12-31',
        icon: MdInventory
    },
    {
        id: 2,
        name: 'Product 2',
        category: 'Category B',
        price: 49.99,
        inStock: false,
        stock: 0,
        expiryDate: '2023-11-30',
        icon: MdInventory
    },
    {
        id: 3,
        name: 'Product 3',
        category: 'Category A',
        price: 19.99,
        inStock: true,
        stock: 50,
        expiryDate: '2025-01-15',
        icon: MdInventory
    },
    {
        id: 4,
        name: 'Product 4',
        category: 'Category C',
        price: 99.99,
        inStock: true,
        stock: 20,
        expiryDate: '2024-06-30',
        icon: MdInventory
    },
    {
        id: 5,
        name: 'Product 5',
        category: 'Category B',
        price: 39.99,
        inStock: false,
        stock: 0,
        expiryDate: '2023-09-15',
        icon: MdInventory
    },
];