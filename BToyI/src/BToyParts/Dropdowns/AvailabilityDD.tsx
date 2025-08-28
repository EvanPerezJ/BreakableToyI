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

interface AvailabilityDDProps {
  selectedAvailability?: string | null;
  onAvailabilityChange?: (availability: string | null) => void;
}

export function AvailabilityDD({
  selectedAvailability = null,
  onAvailabilityChange
}: AvailabilityDDProps) {
  const [open, setOpen] = React.useState(false);
  const [localSelectedAvailability, setLocalSelectedAvailability] = React.useState<string | null>(selectedAvailability);

  React.useEffect(() => {
    setLocalSelectedAvailability(selectedAvailability);
  }, [selectedAvailability]);

  const handleAvailabilityToggle = (availabilityValue: string) => {
    const newSelected = localSelectedAvailability === availabilityValue ? null : availabilityValue;
    setLocalSelectedAvailability(newSelected);
    onAvailabilityChange?.(newSelected);
  };

  const handleClearFilters = () => {
    setLocalSelectedAvailability(null);
    onAvailabilityChange?.(null);
  };

  const hasSelection = localSelectedAvailability !== null;

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10">
            <LuGitPullRequestDraft />
            Availability
            {hasSelection && (
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
                {[
                  { label: 'All', value: 'All', icon: <FaInbox className="mr-2 h-4 w-4" />, color: 'text-slate-900' },
                  { label: 'In Stock', value: 'InStock', icon: <LuGitPullRequestDraft className="mr-2 h-4 w-4" />, color: 'text-green-600' },
                  { label: 'Out of Stock', value: 'OutofStock', icon: <IoClose className="mr-2 h-4 w-4" />, color: 'text-red-600' }
                ].map(({ label, value, icon, color }) => (
                  <CommandItem
                    key={value}
                    className="h-10 mb-2"
                    value={value}
                    onSelect={() => handleAvailabilityToggle(value)}
                  >
                    <Checkbox
                      className="size-4 rounded-[4px]"
                      checked={localSelectedAvailability === value}
                      
                    />
                    <div className={`flex items-center gap-1 p-1 rounded-lg px-4 text-[13px] ${color} ${localSelectedAvailability === value ? 'bg-accent' : ''}`}>
                      {icon}
                      {label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button
                variant="ghost"
                className="text-[12px] mb-1"
                onClick={handleClearFilters}
                disabled={!hasSelection}
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