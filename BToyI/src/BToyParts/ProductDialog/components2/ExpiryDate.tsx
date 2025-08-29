import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function ExpiryDate({ value, onChange }: Props) {
  const safeValue = value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';

  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="expiryDate" className="text-slate-600">
        Expiry Date
      </Label>
      <Input
        type="date"
        id="expiryDate"
        value={safeValue}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 shadow-none"
        placeholder="Expiry Date..."
      />
    </div>
  );
}