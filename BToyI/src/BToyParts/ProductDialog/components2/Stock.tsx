import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumericFormat } from "react-number-format";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function Stock({ value, onChange }: Props) {
  const isInvalid = value <= 0;

  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="stock" className="text-slate-600">
        Items in Stock
      </Label>
      <NumericFormat
        value={value}
        onValueChange={(values) => {
          const floatValue = values.floatValue ?? 0;
          onChange(floatValue);
        }}
        className={`h-11 ${isInvalid ? 'border-red-500' : ''}`}
        customInput={Input}
        thousandSeparator
        allowNegative={false}
        decimalScale={0} // 👈 fuerza que sea entero
        placeholder="Items in stock..."
      />
      {isInvalid && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <p>The quantity is required</p>
        </div>
      )}
    </div>
  );
}