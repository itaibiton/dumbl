import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with proper class merging
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Class Variance Authority (CVA) implementation for React Native
 * Provides a way to create component variants with conditional styling
 */
export type VariantProps<T> = T extends (...args: any[]) => any
  ? Parameters<T>[0]
  : never;

export interface CVAOptions {
  variants?: Record<string, Record<string, string>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<{
    [key: string]: string | string[];
    class: string;
  }>;
}

export function cva(base: string, options?: CVAOptions) {
  return (props?: Record<string, any>) => {
    if (!options) return base;

    const { variants, defaultVariants, compoundVariants } = options;
    
    let classes = [base];

    // Apply default variants
    const activeVariants = { ...defaultVariants, ...props };

    // Apply variant classes
    if (variants) {
      Object.entries(activeVariants).forEach(([key, value]) => {
        if (variants[key] && variants[key][value]) {
          classes.push(variants[key][value]);
        }
      });
    }

    // Apply compound variants
    if (compoundVariants) {
      compoundVariants.forEach((compound) => {
        const { class: compoundClass, ...conditions } = compound;
        
        const matches = Object.entries(conditions).every(([key, condition]) => {
          const activeValue = activeVariants[key];
          
          if (Array.isArray(condition)) {
            return condition.includes(activeValue);
          }
          
          return condition === activeValue;
        });

        if (matches) {
          classes.push(compoundClass);
        }
      });
    }

    return cn(...classes);
  };
}

/**
 * Helper function to create responsive classes
 */
export function responsive(classes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}) {
  const { base = '', sm, md, lg, xl } = classes;
  
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`
  );
}

/**
 * Helper to format numbers for fitness metrics
 */
export function formatNumber(num: number, decimals: number = 0): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
}

/**
 * Helper to format duration in seconds to readable format
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

/**
 * Helper to calculate percentage
 */
export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}