import * as React from "react";
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { LuGitPullRequestDraft } from 'react-icons/lu';
import { IoClose } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";
import { useProducts } from '@/hooks/useProducts';

export function AvailabilityDD() {
  const { selectedAvailability, filterByAvailability } = useProducts();
  const [open, setOpen] = React.useState(false);

  const options = [
    { label: 'All', value: 'All', icon: <FaInbox className="mr-2 h-4 w-4" />, color: 'text-slate-900' },
    { label: 'In Stock', value: 'InStock', icon: <LuGitPullRequestDraft className="mr-2 h-4 w-4" />, color: 'text-green-600' },
    { label: 'Out of Stock', value: 'OutofStock', icon: <IoClose className="mr-2 h-4 w-4" />, color: 'text-red-600' }
  ];

  const handleSelect = (val: string) => {
    // Si seleccionas el que ya está, vuelve a 'All'
    const newValue = selectedAvailability === val ? 'All' : val;
    filterByAvailability(newValue);
    setOpen(false);
  };

  const handleClear = () => {
    filterByAvailability('All');
    setOpen(false);
  };

  const hasSelection = selectedAvailability && selectedAvailability !== 'All';
  const currentLabel = options.find(o => o.value === selectedAvailability)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="h-10 border-dashed border">
          <LuGitPullRequestDraft className="mr-2 h-4 w-4" />
          Availability
          {hasSelection && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <span className="bg-primary/10 text-primary rounded-sm px-1 text-xs font-normal">
                {currentLabel}
              </span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-48" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map(({ label, value, icon, color }) => {
                const isSelected = (selectedAvailability || 'All') === value;
                return (
                  <CommandItem key={value} value={value} onSelect={() => handleSelect(value)}>
                    <Checkbox className="mr-2 size-4" checked={isSelected} />
                    <div className={`flex items-center gap-1 ${color}`}>{icon} {label}</div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {hasSelection && (
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