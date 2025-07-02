"use client";

import { Label } from "@/components/ui/label";
import * as React from "react";
import { useFormContext } from "react-hook-form";

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: FormSelectOption[];
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        id={name}
        {...register(name)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
