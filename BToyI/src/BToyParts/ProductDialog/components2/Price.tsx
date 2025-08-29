import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumericFormat } from "react-number-format";

interface Props {
  value: number | undefined;
  onChange: (value: number) => void;
}

export default function Price({ value, onChange }: Props) {
  const safeValue = typeof value === "number" ? value : 0;
  const isInvalid = safeValue <= 0;

  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="price" className="text-slate-600">
        Price
      </Label>
      <NumericFormat
        value={safeValue.toFixed(2)} // ✅ solo si es número válido
        onValueChange={(values) => {
          const floatValue = values.floatValue ?? 0;
          onChange(floatValue);
        }}
        className={`h-11 ${isInvalid ? 'border-red-500' : ''}`}
        customInput={Input}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale={true}
        prefix="$"
        placeholder="Price..."
      />
      {isInvalid && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <p>The price is required</p>
        </div>
      )}
    </div>
  );
}