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
    {
        id: 6,
        name: 'Product 6',
        category: 'Category C',
        price: 59.99,
        inStock: true,
        stock: 75,
        expiryDate: '2025-03-20',
        icon: MdInventory
    },
    {
        id: 7,
        name: 'Product 7',
        category: 'Category A',
        price: 24.99,
        inStock: true,
        stock: 150,
        expiryDate: '2024-08-25',
        icon: MdInventory
    },
    {
        id: 8,
        name: 'Product 8',
        category: 'Category B',
        price: 79.99,
        inStock: false,
        stock: 0,
        expiryDate: '2023-12-10',
        icon: MdInventory
    },
    {
        id: 9,
        name: 'Product 9',
        category: 'Category C',
        price: 89.99,
        inStock: true,
        stock: 30,
        expiryDate: '2024-11-05',
        icon: MdInventory
    },
    {
        id: 10,
        name: 'Product 10',
        category: 'Category A',
        price: 14.99,
        inStock: true,
        stock: 200,
        expiryDate: '2025-05-15',
        icon: MdInventory
    },
    {
        id: 11,
        name: 'Product 11',
        category: 'Category B',
        price: 44.99,
        inStock: false,
        stock: 0,
        expiryDate: '2023-10-20',
        icon: MdInventory
    },
    {
        id: 12,
        name: 'Product 12',
        category: 'Category C',
        price: 69.99,
        inStock: true,
        stock: 60,
        expiryDate: '2024-07-30',
        icon: MdInventory
    }
];