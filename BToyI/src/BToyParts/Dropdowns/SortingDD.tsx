import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Column } from '@tanstack/react-table';
import type { Product } from '../../products/columns';
// ❌ QUITAR: import { useProducts } from '../../products/productData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface SortingDDProps {
  title: string;
  columnId: string;
  column: Column<Product, unknown>;
  updateSorting: (col: string, dir: 'asc' | 'desc') => void; // ← Esta función viene como prop
}

const SortingDD: React.FC<SortingDDProps> = ({ title, columnId, column, updateSorting }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === 'asc' ? IoMdArrowUp : isSorted === 'desc' ? IoMdArrowDown : ArrowUpDown;

  const handleSort = (direction: 'asc' | 'desc') => {
    // Llamar tanto a la función de React Table como a la del hook
    column.toggleSorting(direction === 'desc');
    updateSorting(columnId, direction);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" aria-label={`Sort by ${title}`}>
          {title}
          <SortingIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => handleSort('asc')}>
          <IoMdArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort('desc')}>
          <IoMdArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortingDD;