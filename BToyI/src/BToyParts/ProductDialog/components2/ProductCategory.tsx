import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ProductCategory({ value, onChange }: Props) {
  const categories = ["Electronics", "Furniture", "Toys", "Groceries", "Clothing", "Books"];
  const [customCategory, setCustomCategory] = useState("");

  // Si el valor cambia externamente y no es una categoría conocida, lo tratamos como personalizado
  useEffect(() => {
    if (!categories.includes(value)) {
      setCustomCategory(value);
    }
  }, [value]);

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label className="text-slate-600">Product's Category</Label>

      <select
        value={categories.includes(value) ? value : "custom"}
        onChange={(e) => {
          const selected = e.target.value;
          if (selected === "custom") {
            onChange(customCategory); // mantiene el valor actual del input
          } else {
            onChange(selected);
          }
        }}
        className="h-11 shadow-none border rounded px-3"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        <option value="custom">Other (write below)</option>
      </select>

      {(!categories.includes(value) || value === "custom") && (
        <Input
          type="text"
          value={customCategory}
          onChange={(e) => {
            const newValue = e.target.value;
            setCustomCategory(newValue);
            onChange(newValue); // actualiza el valor externo
          }}
          className="h-11 mt-2"
          placeholder="Write custom category..."
        />
      )}
    </div>
  );
}