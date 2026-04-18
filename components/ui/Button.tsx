import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#0A0A0A] text-white",
    "border border-[#0A0A0A]",
    "hover:bg-[#1a1a1a]",
    "active:bg-[#2a2a2a]",
    "disabled:bg-[#6B6B6B] disabled:border-[#6B6B6B] disabled:cursor-not-allowed",
  ].join(" "),

  ghost: [
    "bg-white text-[#0A0A0A]",
    "border border-[#0A0A0A]",
    "hover:bg-[#F5F5F5]",
    "active:bg-[#E5E5E5]",
    "disabled:text-[#6B6B6B] disabled:border-[#E5E5E5] disabled:cursor-not-allowed",
  ].join(" "),

  danger: [
    "bg-white text-red-600",
    "border border-red-400",
    "hover:bg-red-50",
    "active:bg-red-100",
    "disabled:text-red-300 disabled:border-red-200 disabled:cursor-not-allowed",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-[13px]",
  md: "h-9 px-4 text-[14px]",
  lg: "h-10 px-5 text-[14px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base
          "inline-flex items-center justify-center gap-2",
          "rounded-[8px]",
          "font-[500] leading-none tracking-[-0.01em]",
          "transition-colors duration-100",
          "select-none outline-none",
          "focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2",
          // Variant
          variantClasses[variant],
          // Size
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-3.5 w-3.5 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";