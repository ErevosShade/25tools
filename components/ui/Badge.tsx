import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "free" | "pro" | "new";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  free: "bg-[#F5F5F5] text-[#6B6B6B] border border-[#E5E5E5]",
  pro:  "bg-[#0A0A0A] text-white border border-[#0A0A0A]",
  new:  "bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5]",
};

const variantLabels: Record<BadgeVariant, string> = {
  free: "Free",
  pro:  "Pro",
  new:  "New",
};

export function Badge({
  variant = "free",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base
        "inline-flex items-center justify-center",
        "rounded-full",
        "px-2 py-0.5",
        "text-[11px] font-[500] leading-none tracking-[0.01em]",
        "whitespace-nowrap select-none",
        // Variant
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children ?? variantLabels[variant]}
    </span>
  );
}