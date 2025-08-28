import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import {NumericFormat} from 'react-number-format';


export default function Stock() {
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="stock" className="text-slate-600">
        Items in Stock
      </Label>
      <NumericFormat
              value={0}
              className="h-11"
              customInput={Input}
              thousandSeparator
              placeholder="Items in stock..."
            />
      <div className="text-red-500 flex gap-1 items-center text-[13px]">
        <p>The quantity is required</p>
      </div>
    </div>
  );
}