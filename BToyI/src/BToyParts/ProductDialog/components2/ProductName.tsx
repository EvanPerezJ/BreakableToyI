import { Input } from "@/components/ui/input";
import {Label} from '@/components/ui/label';

export default function ProductName(){
    return(
        <div className="mt-5 flex flex-col gap-2">
            <Label htmlFor="productName" className="text-slate-600">
                {`Product's Name`}
            </Label>

            <Input 
                type="text"
                id="productName"
                className="h-11 shadow-none"
                placeholder="Laptop..."
            />

            <div className="text-red-500 flex gap-1 items-center text-[13px]">
                <p>The product name is required</p>
            </div>
        </div>
    );
}