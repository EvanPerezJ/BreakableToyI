import * as React from "react";
import {Button} from '@/components/ui/button';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Separator} from '@/components/ui/separator';
import {Checkbox} from '@/components/ui/checkbox';

import {LuGitPullRequestDraft} from 'react-icons/lu';
import { IoClose } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

interface AvailabilityDDProps {
    selectedAvailability?: string | null; // Disponibilidad actualmente seleccionada
    onAvailabilityChange?: (availability: string | null) => void; // Callback cuando cambie la disponibilidad
}

export function AvailabilityDD({ selectedAvailability = null, onAvailabilityChange }: AvailabilityDDProps) {
    const [open, setOpen] = React.useState(false);
    const [localSelectedAvailability, setLocalSelectedAvailability] = React.useState<string | null>(selectedAvailability);

    // Sincronizar con props externas
    React.useEffect(() => {
        setLocalSelectedAvailability(selectedAvailability);
    }, [selectedAvailability]);

    // Manejar selección de disponibilidad (solo una opción a la vez)
    const handleAvailabilityToggle = (availabilityValue: string) => {
        const newSelectedAvailability = localSelectedAvailability === availabilityValue ? null : availabilityValue;
        setLocalSelectedAvailability(newSelectedAvailability);
        onAvailabilityChange?.(newSelectedAvailability);
    };

    // Limpiar filtros
    const handleClearFilters = () => {
        setLocalSelectedAvailability(null);
        onAvailabilityChange?.(null);
    };

    function returnColor(status: string) {
        switch(status.toLowerCase()) {
            case 'all':
                return 'text-slate-900';
            case 'instock':
                return 'text-green-600';
            case 'outofstock':
                return 'text-red-600';
            default:
                return 'text-slate-900';
        }
    }

    // Determinar si hay una opción seleccionada para mostrar en el botón
    const hasSelection = localSelectedAvailability !== null;

    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"secondary"} className="h-10">
                        <LuGitPullRequestDraft/>
                        Availability
                        {selectedOption && (
                            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                                1
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-48" align="center" side="bottom">
                    <Command className="p-1">
                        <CommandList>
                            <CommandGroup>
                                {/* All */}
                                <CommandItem 
                                    className="h-10 mb-2" 
                                    value="All"
                                    onSelect={() => handleAvailabilityToggle('All')}
                                >
                                    <Checkbox 
                                        className="size-4 rounded-[4px]"
                                        checked={localSelectedAvailability === 'All'}
                                        onChange={() => handleAvailabilityToggle('All')}
                                    />
                                    <div className={`flex items-center gap-1 p-1 rounded-lg px-4 text-[13px] text-slate-900 ${
                                        localSelectedAvailability === 'All' ? 'bg-accent' : ''
                                    }`}>
                                        <FaInbox className="mr-2 h-4 w-4" />
                                        All
                                    </div>
                                </CommandItem>

                                {/* In Stock */}
                                <CommandItem 
                                    className="h-10 mb-2" 
                                    value="InStock"
                                    onSelect={() => handleAvailabilityToggle('InStock')}
                                >
                                    <Checkbox 
                                        className="size-4 rounded-[4px]"
                                        checked={localSelectedAvailability === 'InStock'}
                                        onChange={() => handleAvailabilityToggle('InStock')}
                                    />
                                    <div className={`flex items-center gap-1 p-1 rounded-lg px-4 text-[13px] text-green-600 ${
                                        localSelectedAvailability === 'InStock' ? 'bg-accent' : ''
                                    }`}>
                                        <LuGitPullRequestDraft className="mr-2 h-4 w-4" />
                                        In Stock
                                    </div>
                                </CommandItem>

                                {/* Out of Stock */}
                                <CommandItem 
                                    className="h-10 mb-2" 
                                    value="OutofStock"
                                    onSelect={() => handleAvailabilityToggle('OutofStock')}
                                >
                                    <Checkbox 
                                        className="size-4 rounded-[4px]"
                                        checked={localSelectedAvailability === 'OutofStock'}
                                        onChange={() => handleAvailabilityToggle('OutofStock')}
                                    />
                                    <div className={`flex items-center gap-1 p-1 rounded-lg px-4 text-[13px] text-red-600 ${
                                        localSelectedAvailability === 'OutofStock' ? 'bg-accent' : ''
                                    }`}>
                                        <IoClose className="mr-2 h-4 w-4" />
                                        Out of Stock
                                    </div>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                        <div className="flex flex-col gap-2 text-[23px]">
                            <Separator/>
                            <Button 
                                variant={"ghost"} 
                                className="text-[12px] mb-1"
                                onClick={handleClearFilters}
                                disabled={!localSelectedAvailability}
                            >
                                Clear filters {hasSelection && '(1)'}
                            </Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}