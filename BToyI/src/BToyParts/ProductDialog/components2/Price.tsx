import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import {NumericFormat} from 'react-number-format';

export default function Price() {
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="price" className="text-slate-600">
        Price
      </Label>
      <NumericFormat
        value={0}
        className="h-11"
        customInput={Input}
        thousandSeparator
        placeholder="Price..."
      />
      <div className="text-red-500 flex gap-1 items-center text-[13px]">
        <p>The price is required</p>
      </div>
    </div>
  );
}