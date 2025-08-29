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
import type { Product } from "@/products/columns";

type Category = {
  label: string;
  value: string;
};

interface CategoryDDProps {
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
  products?: Product[];
}

export function CategoryDD({
  selectedCategories = [],
  onCategoryChange,
  products = []
}: CategoryDDProps) {
  const [open, setOpen] = React.useState(false);
  const [localSelectedCategories, setLocalSelectedCategories] = React.useState<string[]>(selectedCategories);

  const categoryOptions: Category[] = React.useMemo(() => {
    const uniqueCategories = [...new Set(products.map((product: Product) => product.category))];
    return uniqueCategories
      .filter((category): category is string => typeof category === 'string' && category.trim() !== '')
      .map((category) => ({ label: category, value: category }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [products]);

  React.useEffect(() => {
    setLocalSelectedCategories(selectedCategories);
  }, [selectedCategories]);

  const handleCategoryToggle = (categoryValue: string) => {
    const newSelected = localSelectedCategories.includes(categoryValue)
      ? localSelectedCategories.filter(cat => cat !== categoryValue)
      : [...localSelectedCategories, categoryValue];

    setLocalSelectedCategories(newSelected);
  };

  const handleApplyFilters = () => {
    onCategoryChange?.(localSelectedCategories);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setLocalSelectedCategories([]);
    onCategoryChange?.([]);
    setOpen(false);
  };

  const selectedCount = localSelectedCategories.length;

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10">
            <LuGitPullRequestDraft />
            Category
            {selectedCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {selectedCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-56" align="end" side="bottom">
          <Command className="p-1">
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty className="text-slate-500 text-sm text-center p-5">
                No category found.
              </CommandEmpty>
              <CommandGroup>
                {categoryOptions.map((option) => {
                  const isSelected = localSelectedCategories.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      className="h-9"
                      onSelect={() => handleCategoryToggle(option.value)}
                    >
                      <Checkbox
                        className="size-4 rounded-[4px]"
                        checked={isSelected}
                      />
                      <div className={`flex items-center gap-1 p-1 rounded-lg px-3 text-[14px] ${
                        isSelected ? 'bg-accent text-accent-foreground' : ''
                      }`}>
                        {option.label}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>

            <div className="flex flex-col gap-2 text-[23px] mt-2">
              <Separator />
              <Button
                variant="default"
                className="text-[12px]"
                onClick={handleApplyFilters}
                disabled={categoryOptions.length === 0}
              >
                Aplicar filtros
              </Button>
              <Button
                variant="ghost"
                className="text-[12px] mb-1"
                onClick={handleClearFilters}
                disabled={selectedCount === 0}
              >
                Limpiar filtros {selectedCount > 0 && `(${selectedCount})`}
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}