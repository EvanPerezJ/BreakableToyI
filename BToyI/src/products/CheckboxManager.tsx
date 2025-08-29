import { useProductActions } from '@/products/productData';
import { useState } from 'react';
import type { Row } from '@tanstack/react-table';
import type { Product } from './columns';

export function CheckboxManager({
  row,
  refetch,
}: {
  row: Row<Product>;
  refetch: () => Promise<void>;
}) 
{

  const { setProductOutOfStock, setProductInStock } = useProductActions();
  const [checked, setChecked] = useState(!row.original.inStock);

  const handleToggle = async () => {
    const confirmMessage = checked
      ? 'Are you sure you want to mark this product as IN STOCK?'
      : 'Are you sure you want to mark this product as OUT OF STOCK?';

    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;

    try {
      if (!checked) {
        await setProductOutOfStock(row.original.id);
        console.log('Product marked as out of stock');
      } else {
        await setProductInStock(row.original.id);
        console.log('Product marked as in stock');
      }
      setChecked(!checked);
      await refetch();
    } catch (error) {
      console.error('Error updating stock status:', error);
    }
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleToggle}
      aria-label={`Toggle stock for product ${row.original.id}`}
    />
  );
}