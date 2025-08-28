import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

export default function ExpiryDate() {
  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label htmlFor="expityDate" className="text-slate-600">
        Expiry Date
      </Label>
      <Input
        type="date"
        id="expiryDate"
        className="h-11 shadow-none"
        placeholder="Expiry Date..."
      />
    </div>
  );
}