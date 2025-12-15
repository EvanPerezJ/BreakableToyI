import { useState } from 'react';
import type { Row } from '@tanstack/react-table';
import type { Product } from '@/types/product';
import { productService } from '@/services/productService';

export function CheckboxManager({
  row,
  refetch,
}: {
  row: Row<Product>;
  refetch: () => Promise<void>;
}) {
  const [checked, setChecked] = useState(row.original.inStock);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    // Optimistic UI update (opcional) o esperar confirmación
    const confirmMessage = checked
      ? 'Are you sure you want to mark this product as OUT OF STOCK?' // Corregido lógica inversa
      : 'Are you sure you want to mark this product as IN STOCK?';

    if (!window.confirm(confirmMessage)) return;

    setLoading(true);
    try {
      if (checked) {
        // Si estaba marcado (InStock), lo ponemos OutOfStock
        await productService.setOutOfStock(row.original.id);
      } else {
        await productService.setInStock(row.original.id);
      }
      
      setChecked(!checked);
      await refetch(); // Recargamos la tabla globalmente
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error al actualizar el stock');
      setChecked(checked); // Revertir en caso de error
    } finally {
        setLoading(false);
    }
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleToggle}
      disabled={loading}
      className="cursor-pointer"
      aria-label={`Toggle stock for product ${row.original.id}`}
    />
  );
}