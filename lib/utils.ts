import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Truncate a string to n characters */
export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

/** Slugify a string for URLs */
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Format a number with commas */
export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}