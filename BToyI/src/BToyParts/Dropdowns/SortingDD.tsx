import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Column } from '@tanstack/react-table';
import type {Product} from '../../products/columns';
import { useProducts } from '../../products/productData'; // ← Importa el hook
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
}


const SortingDD: React.FC<SortingDDProps> = ({ title, columnId, column }) => {
  const { updateSorting } = useProducts(); // ← Aquí se conecta al hook

  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === 'asc' ? IoMdArrowUp : isSorted === 'desc' ? IoMdArrowDown : ArrowUpDown;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" aria-label={`Sort by ${title}`}>
          {title}
          <SortingIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => updateSorting(columnId, 'asc')}>
          <IoMdArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateSorting(columnId, 'desc')}>
          <IoMdArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortingDD;