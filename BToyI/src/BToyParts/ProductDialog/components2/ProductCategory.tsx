import {Label} from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useEffect, useState } from 'react';

export function ProductCategory(){
    const categories = [
        "Electronics",
        "Furniture",
        "Others",
    ];

    const [isClient, setIsClient] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(()=>{
        setIsClient(true);
        setSelectedCategory(categories[0]);
    },[]);

    if (!isClient) return null;

    return(
        <div className='mt-5 flex flex-col gap-2'>
            <Label className='text-slate-600'>{`Product's Category`}</Label>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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