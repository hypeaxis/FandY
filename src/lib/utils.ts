import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers with fixed en-US locale to prevent Next.js SSR hydration mismatch errors
 * (e.g. 5,304.97 vs 5.304,97)
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  if (value === undefined || value === null || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-US', options).format(value);
}
