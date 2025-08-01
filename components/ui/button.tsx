import React from 'react';
import { Pressable, Text, PressableProps, TextProps } from 'react-native';
import { cva, type VariantProps } from '../../lib/utils';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary active:bg-primary/90',
        destructive: 'bg-destructive active:bg-destructive/90',
        outline: 'border border-input bg-background active:bg-accent',
        secondary: 'bg-secondary active:bg-secondary/80',
        ghost: 'active:bg-accent',
        link: 'underline-offset-4 active:underline',
        success: 'bg-success active:bg-success/90',
        warning: 'bg-warning active:bg-warning/90',
        info: 'bg-info active:bg-info/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-14 rounded-lg px-10',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'text-sm font-medium text-center',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'text-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'text-foreground',
        link: 'text-primary',
        success: 'text-success-foreground',
        warning: 'text-warning-foreground',
        info: 'text-info-foreground',
      },
      size: {
        default: 'text-sm',
        sm: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
        icon: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export interface ButtonTextProps
  extends TextProps,
    VariantProps<typeof buttonTextVariants> {
  className?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, children, loading, disabled, ...props }, ref) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, size }),
        isDisabled && 'opacity-50',
        className
      )}
      disabled={isDisabled}
      ref={ref}
      {...props}
    >
      {children}
    </Pressable>
  );
});

const ButtonText = React.forwardRef<
  React.ElementRef<typeof Text>,
  ButtonTextProps
>(({ className, variant, size, ...props }, ref) => (
  <Text
    className={cn(buttonTextVariants({ variant, size }), className)}
    ref={ref}
    {...props}
  />
));

Button.displayName = 'Button';
ButtonText.displayName = 'ButtonText';

export { Button, ButtonText, buttonVariants };