"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FormCardLink {
  href: string;
  name: string;
  message?: string;
}

interface FormCardProps {
  title: string;
  description?: string;
  error?: string | null;
  children: ReactNode;
  topLink?: FormCardLink;
  bottomLink?: FormCardLink;
  className?: string;
  isLoading?: boolean;
  onSubmit?: () => void;
  submitText?: string;
  showSubmitButton?: boolean;
}

export function FormCard({
  title,
  description,
  error,
  children,
  topLink,
  bottomLink,
  className,
  isLoading = false,
  onSubmit,
  submitText = "Submit",
  showSubmitButton = false,
}: FormCardProps) {
  return (
    <Card className={cn("w-full max-w-md lg:max-w-lg", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-base">{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">{children}</div>

        {topLink && (
          <div className="pt-2">
            <Link
              href={topLink.href}
              className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {topLink.name}
            </Link>
          </div>
        )}

        {showSubmitButton && onSubmit && (
          <Button
            type="submit"
            className="w-full"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : submitText}
          </Button>
        )}
      </CardContent>

      {bottomLink && (
        <CardFooter className="flex flex-col space-y-2 border-t pt-6">
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <span>{bottomLink.message}</span>
            <Link
              href={bottomLink.href}
              className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {bottomLink.name}
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

// Export as default for backward compatibility
export default FormCard;
