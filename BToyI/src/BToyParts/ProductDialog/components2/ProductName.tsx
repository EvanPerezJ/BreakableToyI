import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductName({ value, onChange }: Props) {
  const isEmpty = !value || value.trim() === '';

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="productName" className="text-slate-600">
        Product's Name
      </Label>

      <Input
        type="text"
        id="productName"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 shadow-none ${isEmpty ? 'border-red-500' : ''}`}
        placeholder="Laptop..."
      />

      {isEmpty && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <p>The product name is required</p>
        </div>
      )}
    </div>
  );
}