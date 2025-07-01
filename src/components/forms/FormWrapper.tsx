"use client";

import * as React from "react";
import { FormProvider, UseFormReturn, type FieldValues } from "react-hook-form";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormWrapperProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
