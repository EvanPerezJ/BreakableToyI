import * as React from 'react';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SortingDDProps {
  title: string;
  columnId: string;
}

export default function SortingDD({ title, columnId }: SortingDDProps) {
  const { updateSorting, filters } = useProducts();

  // Verificamos si esta columna está activa
  const isSorted = filters.sortBy === columnId;
  const direction = filters.sortOrder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
            variant="ghost" 
            size="sm" 
            className={`-ml-3 h-8 data-[state=open]:bg-accent ${isSorted ? 'text-primary font-bold' : ''}`}
        >
          {title}
          {isSorted ? (
             direction === 'asc' ? <IoMdArrowUp className="ml-2 h-4 w-4" /> : <IoMdArrowDown className="ml-2 h-4 w-4" />
          ) : (
             <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => updateSorting(columnId)}>
          <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Toggle Sort
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}