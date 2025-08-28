import {Label} from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

//import { useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ProductCategory({ value, onChange }: Props){
    const categories = [
        "Electronics",
        "Furniture",
        "Others",
    ];



    return(
        <div className='mt-5 flex flex-col gap-2'>
            <Label className='text-slate-600'>{`Product's Category`}</Label>

            <Select value={value} onValueChange={
                (values) => {
                const valueString = values ?? 0;
                onChange(valueString)
                }
            }>
                <SelectTrigger className='h-11 shadow-none'>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.map((category) => 
                            (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
        </div>
    );
}