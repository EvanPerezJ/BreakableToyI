
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

type Avalilability = {
    label: string;
    value: string;
    icon: React.ReactNode;
}

const availabilityOptions: Avalilability[] = [
    {
        label: 'All',
        value: 'all',
        icon: <FaInbox className="mr-2 h-4 w-4" />
    },
    {
        label: 'In Stock',
        value: 'in_stock',
        icon: <LuGitPullRequestDraft className="mr-2 h-4 w-4" />
    },
    {
        label: 'Out of Stock',
        value: 'out_of_stock',
        icon: <IoClose className="mr-2 h-4 w-4" />
    }
];

export function AvalilabilityDD(){
    const [open, setOpen] = React.useState(false);

    function returnColor(status: string){
        switch(status){
            case 'all':
                return 'text-slate-900';
            case 'in_stock':
                return 'text-green-600';
            case 'out_of_stock':
                return 'text-red-600';
            default:
                return 'text-slate-900';
        }
    }

    return(
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"secondary"} className="h-10">
                        <LuGitPullRequestDraft/>
                        Availability
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-48" align="center" side="bottom">
                    <Command className="p-1">
                        <CommandList>
                            <CommandGroup>
                                {availabilityOptions.map((option)=>(
                                    <CommandItem className="h-10 mb-2" key={option.value} value={option.value}>
                                        <Checkbox className="size-4 rounded-[4px]"/>
                                        <div className={`flex items-center gap-1 ${returnColor(option.value)} p-1 rounded-lg px-4 text-[13px]`}>
                                            {option.icon}
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
    );
}