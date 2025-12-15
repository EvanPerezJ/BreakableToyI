import React from 'react';
import { ProductProvider } from '@/context/ProductProvider'; // El cerebro de la app
import HomePage from '@/pages/HomePage'; // La vista principal

function App() {
  return (
    // 1. Proveedor de Datos Globales
    <ProductProvider>
      
      {/* 2. Renderizado de la Página */}
      <HomePage />

    </ProductProvider>
  );
}

export default App;