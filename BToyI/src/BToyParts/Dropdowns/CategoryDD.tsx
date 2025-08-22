import * as React from "react";
import {Button} from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Separator} from '@/components/ui/separator';
import {Checkbox} from '@/components/ui/checkbox';

import {LuGitPullRequestDraft} from 'react-icons/lu';

type Category = {
    label: string;
    value: string;
}

const categoryOptions: Category[] = [
    {
        label: 'Category 1',
        value: 'category_1'
    },
    {
        label: 'Category 2',
        value: 'category_2'
    },
    {
        label: 'Category 3',
        value: 'category_3'
    }
];

export function CategoryDD(){
    const [open, setOpen] = React.useState(false);
    
    return(
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"secondary"} className="h-10">
                        <LuGitPullRequestDraft/>
                        Availability
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-56" align="end" side="bottom">
                    <Command className="p-1">
                        <CommandInput placeholder="Category" />
                        <CommandList>
                            <CommandEmpty className="text-slate-500 text-sm text-center p-5">No category found.</CommandEmpty>
                            <CommandGroup>
                                {categoryOptions.map((option) => (
                                    <CommandItem key={option.value} value={option.value} className="h-9">
                                        <Checkbox className="size-4 rounded-[4px]" />
                                        <div className={`flex items-center gap-1 p-1 rounded-lg px-3 text-[14px]`}>
                                            {option.label}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <div className="flex flex-col gap-2 text-[23px]">
                                <Separator/>
                                <Button variant={"ghost"} className="text-[12px] mb-1">
                                    Clear filters
                                </Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
