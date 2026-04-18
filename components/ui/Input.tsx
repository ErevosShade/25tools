import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      leading,
      trailing,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-[500] text-[#0A0A0A] leading-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex w-full items-center">
          {leading && (
            <div className="pointer-events-none absolute left-3 flex items-center text-[#6B6B6B]">
              {leading}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              // Base
              "w-full h-9",
              "rounded-[8px]",
              "border border-[#E5E5E5]",
              "bg-white",
              "px-3",
              "text-[14px] font-[400] text-[#0A0A0A]",
              "placeholder:text-[#6B6B6B]",
              "leading-none",
              // Focus
              "outline-none",
              "focus:border-[#0A0A0A]",
              "transition-colors duration-100",
              // Error
              error && "border-red-400 focus:border-red-600",
              // Disabled
              disabled && "bg-[#F5F5F5] text-[#6B6B6B] cursor-not-allowed",
              // Leading/trailing padding
              leading && "pl-9",
              trailing && "pr-9",
              className
            )}
            {...props}
          />

          {trailing && (
            <div className="pointer-events-none absolute right-3 flex items-center text-[#6B6B6B]">
              {trailing}
            </div>
          )}
        </div>

        {(hint || error) && (
          <p
            className={cn(
              "text-[12px] font-[400] leading-none",
              error ? "text-red-500" : "text-[#6B6B6B]"
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";