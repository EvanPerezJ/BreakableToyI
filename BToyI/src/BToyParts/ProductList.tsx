import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  price: number;
};

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    totalPages: 0,
    totalProducts: 0
  });

  useEffect(() => {
    fetchProducts(pageInfo.page, pageInfo.size);
  }, [pageInfo.page, pageInfo.size]); // Corrección: actualiza cuando cambian page o size

  const fetchProducts = async (page: number, size: number) => {
    try {
      const response = await axios.get('http://localhost:9090/products', {
        params: { page, size }
      });

      // Verifica que products sea un array
      const productsArray = Array.isArray(response.data.products) ? response.data.products : [];
      setProducts(productsArray);

      setPageInfo({
        page: response.data.page,
        size: response.data.size,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // En caso de error, pon un array vacío
    }
  };

  return (
    <div>
      <h2>Products (Page {pageInfo.page} of {pageInfo.totalPages})</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product, index) => (
            <li key={product.id ?? index}>
              <strong>{product.name}</strong> - ${product.price}
            </li>
          ))
        ) : (
          <li>No products found.</li>
        )}
      </ul>
    </div>
  );
};

export default ProductsList;
