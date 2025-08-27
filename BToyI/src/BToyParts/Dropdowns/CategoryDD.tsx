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
import { useProducts } from '../../products/productData'; // Ajusta la ruta

type Category = {
    label: string;
    value: string;
}

interface CategoryDDProps {
    selectedCategories?: string[]; // Categorías actualmente seleccionadas
    onCategoryChange?: (categories: string[]) => void; // Callback cuando cambien las categorías
}

export function CategoryDD({ selectedCategories = [], onCategoryChange }: CategoryDDProps) {
    const [open, setOpen] = React.useState(false);
    const [localSelectedCategories, setLocalSelectedCategories] = React.useState<string[]>(selectedCategories);
    
    // Obtener todas las categorías disponibles desde el hook
    const { products } = useProducts();
    
    // Extraer categorías únicas de los productos
    const categoryOptions: Category[] = React.useMemo(() => {
        const uniqueCategories = [...new Set(products.map((product: any) => product.category as string))];
        return uniqueCategories
            .filter((category): category is string => typeof category === 'string')
            .map((category: string) => ({
                label: category,
                value: category
            }))
            .sort((a: Category, b: Category) => a.label.localeCompare(b.label));
    }, [products]);

    // Sincronizar con props externas
    React.useEffect(() => {
        setLocalSelectedCategories(selectedCategories);
    }, [selectedCategories]);

    // Manejar selección/deselección de categoría
    const handleCategoryToggle = (categoryValue: string) => {
        const newSelectedCategories = localSelectedCategories.includes(categoryValue)
            ? localSelectedCategories.filter((cat: string) => cat !== categoryValue)
            : [...localSelectedCategories, categoryValue];
        
        setLocalSelectedCategories(newSelectedCategories);
        onCategoryChange?.(newSelectedCategories);
    };

    // Limpiar todas las categorías
    const handleClearFilters = () => {
        setLocalSelectedCategories([]);
        onCategoryChange?.([]);
    };

    // Contar categorías seleccionadas para mostrar en el botón
    const selectedCount = localSelectedCategories.length;

    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"secondary"} className="h-10">
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
                                {categoryOptions.map((option: Category) => {
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
                                                onChange={() => handleCategoryToggle(option.value)}
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
                        {(selectedCount > 0 || categoryOptions.length > 0) && (
                            <div className="flex flex-col gap-2 text-[23px]">
                                <Separator />
                                <Button 
                                    variant={"ghost"} 
                                    className="text-[12px] mb-1"
                                    onClick={handleClearFilters}
                                    disabled={selectedCount === 0}
                                >
                                    Clear filters {selectedCount > 0 && `(${selectedCount})`}
                                </Button>
                            </div>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}