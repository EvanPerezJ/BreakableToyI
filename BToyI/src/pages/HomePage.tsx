import React from "react";
// Importamos los componentes que acabamos de separar
import AppHeader from "@/components/products/AppHeader"; 
import ProductSection from "@/components/products/ProductSection";
import MetricsSection from "@/components/metrics/MetricsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* --- 1. Header Fijo --- */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <AppHeader />
        </div>
      </header>

      {/* --- 2. Contenido Principal --- */}
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 space-y-10">
        
        {/* Sección A: Gestión de Inventario (Tabla, Filtros, Crear) */}
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Inventario</h2>
            <p className="text-muted-foreground">
              Gestiona tus productos, filtra por categorías y actualiza el stock.
            </p>
          </div>
          <ProductSection />
        </section>

        {/* Sección B: Métricas (Estadísticas) */}
        <section>
          {/* El título "Metrics" ya viene dentro de MetricsSection (en tu componente Section), 
              pero aquí le damos el contenedor adecuado */}
          <MetricsSection />
        </section>

      </main>

      {/* --- 3. Footer --- */}
      <footer className="py-6 border-t text-center text-sm text-muted-foreground bg-slate-50/50 mt-auto">
        <p>
          &copy; {new Date().getFullYear()} Breakable Toy I. Sistema de Gestión de Inventario.
        </p>
      </footer>
    </div>
  );
}