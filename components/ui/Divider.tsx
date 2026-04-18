import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type DividerOrientation = "horizontal" | "vertical";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  label?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "w-px self-stretch bg-[#E5E5E5] shrink-0",
          className
        )}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex items-center gap-3 w-full", className)}
        {...props}
      >
        <div className="h-px flex-1 bg-[#E5E5E5]" />
        <span className="text-[11px] font-[500] text-[#6B6B6B] tracking-[0.04em] uppercase leading-none whitespace-nowrap">
          {label}
        </span>
        <div className="h-px flex-1 bg-[#E5E5E5]" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full bg-[#E5E5E5]", className)}
      {...props}
    />
  );
}