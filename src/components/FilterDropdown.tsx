import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
};

const FilterDropdown = ({ label, options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block min-w-[120px]">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        {value || label}
        <span className="ml-2">▼</span>
      </Button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-md">
          <div
            className="px-3 py-2 cursor-pointer hover:bg-muted text-sm"
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          >
            All
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              className="px-3 py-2 cursor-pointer hover:bg-muted text-sm"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
