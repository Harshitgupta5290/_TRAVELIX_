import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconRight, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm",
              "ring-offset-background placeholder:text-muted-foreground/60",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:border-brand-500",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
              "transition-all duration-200",
              icon && "pl-10",
              iconRight && "pr-10",
              error && "border-destructive focus-visible:ring-destructive/40",
              className
            )}
            ref={ref}
            {...props}
          />
          {iconRight && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground">
              {iconRight}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
