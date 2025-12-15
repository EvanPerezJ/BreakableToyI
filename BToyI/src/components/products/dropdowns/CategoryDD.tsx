import * as React from "react";
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { LuGitPullRequestDraft } from 'react-icons/lu';
import { useProducts } from '@/hooks/useProducts';

export function CategoryDD() {
  // Conexión directa al contexto
  const { products, filterByCategory, selectedCategory } = useProducts();
  const [open, setOpen] = React.useState(false);

  // Generamos opciones basadas en los productos actuales
  const categoryOptions = React.useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories
      .filter((cat): cat is string => !!cat)
      .map((cat) => ({ label: cat, value: cat }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [products]);

  const handleSelect = (val: string) => {
    const newValue = selectedCategory === val ? "" : val;
    filterByCategory(newValue);
    setOpen(false);
  };

  const handleClear = () => {
    filterByCategory("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="h-10 border-dashed border">
          <LuGitPullRequestDraft className="mr-2 h-4 w-4" />
          Category
          {selectedCategory && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <span className="bg-primary/10 text-primary rounded-sm px-1 text-xs font-normal">
                {selectedCategory}
              </span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-56" align="start">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categoryOptions.map((option) => {
                const isSelected = selectedCategory === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Checkbox
                      className="mr-2 size-4"
                      checked={isSelected}
                    />
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {(selectedCategory) && (
             <div className="p-1 border-t">
               <Button variant="ghost" size="sm" className="w-full justify-center h-8 text-xs" onClick={handleClear}>
                 Clear filters
               </Button>
             </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}