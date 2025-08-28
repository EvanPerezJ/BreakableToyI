import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ExpiryDate({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="expityDate" className="text-slate-600">
        Expiry Date
      </Label>
      <Input
        type="date"
        id="expiryDate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 shadow-none"
        placeholder="Expiry Date..."
      />
    </div>
  );
}