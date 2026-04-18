import React, { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "article" | "section" | "li";
  hover?: boolean;
}

export function Card({
  as: Tag = "div",
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "bg-white",
        "border border-[#E5E5E5]",
        "rounded-[12px]",
        "p-5",
        hover && [
          "transition-colors duration-100",
          "hover:border-[#D0D0D0]",
          "cursor-pointer",
        ],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
}

export function CardTitle({
  as: Tag = "h3",
  className,
  children,
  ...props
}: CardTitleProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "text-[14px] font-[500] text-[#0A0A0A] leading-snug tracking-[-0.01em]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-[13px] font-[400] text-[#6B6B6B] leading-relaxed max-w-none m-0",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between mt-4 pt-4 border-t border-[#E5E5E5]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}