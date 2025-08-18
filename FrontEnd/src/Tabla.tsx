import React, { useState } from 'react';
import {Edit, Trash2} from 'lucide-react';

//Codigo para harcodear la tabla
interface Product {
    id: number;
    categoria: string;
    nombre: string;
    precio: number;
    expirationDate: string;
    stock: number;
}

const initialProducts: Product[] = [
    { id: 1, categoria: 'Electronics', nombre: 'Laptop', precio: 999.99, expirationDate: '2025-12-31', stock: 10 },
    { id: 2, categoria: 'Clothing', nombre: 'T-Shirt', precio: 19.99, expirationDate: '2024-06-30', stock: 50 },
    { id: 3, categoria: 'Food', nombre: 'Chocolate Bar', precio: 1.99, expirationDate: '2023-11-15', stock: 100 },
];

const Tabla: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const handleEdit = (id: number) => {
        console.log('Editando producto: ', id);
        alert(`Editando producto con ID: ${id}`);
    }

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('es-MX',{ style: 'currency', currency: 'MXN' }).format(price);
    };

    const formatDate = (dateStr: string): string => {
        const parsedDate = new Date(dateStr);
        return parsedDate.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };


    return (

        <div className="w-full max-w-7xl mx-auto p-6 bg-white">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Breakable Toy I</h1>
                <p className="text-gray-600">Inventario de productos</p>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className = "w-full table-auto border-collapse bg-white">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de expiracion</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            products.map((product,index)=>(
                                <tr key={product.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {product.categoria}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nombre}</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatPrice(product.precio)}</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{formatDate(product.expirationDate)}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {product.stock}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleEdit(product.id)} 
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                                                <Edit className="w-4 h-4 mr-1" />
                                                Editar
                                            </button>

                                            <button onClick={() => handleDelete(product.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1">
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>

            {products.length === 0 && (
                <div className="text-center py-12 bg-white border-t">
                    <p className="text-gray-500 text-lg">
                        No hay productos disponibles. Agrega algunos para comenzar.
                    </p>
                </div>
            )}

        </div>
    
    );

};

export default Tabla;