import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { Progress } from './progress';
import { cn, calculatePercentage, formatNumber } from '../../lib/utils';

export interface ProgressIndicatorProps extends ViewProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
  size?: 'sm' | 'default' | 'lg';
  showPercentage?: boolean;
  showValues?: boolean;
  className?: string;
}

const variantStyles = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
  info: 'bg-info',
};

const sizeStyles = {
  sm: {
    container: 'space-y-2',
    label: 'text-sm',
    values: 'text-xs',
    progress: 'h-2',
  },
  default: {
    container: 'space-y-3',
    label: 'text-base',
    values: 'text-sm',
    progress: 'h-3',
  },
  lg: {
    container: 'space-y-4',
    label: 'text-lg',
    values: 'text-base',
    progress: 'h-4',
  },
};

const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ProgressIndicatorProps
>(({
  label,
  current,
  target,
  unit,
  variant = 'default',
  size = 'default',
  showPercentage = true,
  showValues = true,
  className,
  ...props
}, ref) => {
  const percentage = calculatePercentage(current, target);
  const sizeStyle = sizeStyles[size];
  const isComplete = current >= target;

  return (
    <View
      ref={ref}
      className={cn(sizeStyle.container, className)}
      {...props}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <Text className={cn(
          'font-medium text-foreground',
          sizeStyle.label
        )}>
          {label}
        </Text>
        
        {showPercentage && (
          <Text className={cn(
            'font-semibold',
            isComplete ? 'text-success' : 'text-muted-foreground',
            sizeStyle.values
          )}>
            {percentage}%
          </Text>
        )}
      </View>

      {/* Progress Bar */}
      <Progress
        value={current}
        max={target}
        className={cn(sizeStyle.progress)}
        indicatorClassName={cn(
          variantStyles[variant],
          isComplete && 'bg-success'
        )}
      />

      {/* Values */}
      {showValues && (
        <View className="flex-row items-center justify-between">
          <Text className={cn(
            'text-muted-foreground',
            sizeStyle.values
          )}>
            {formatNumber(current, 1)}{unit ? ` ${unit}` : ''}
          </Text>
          
          <Text className={cn(
            'text-muted-foreground',
            sizeStyle.values
          )}>
            Target: {formatNumber(target, 1)}{unit ? ` ${unit}` : ''}
          </Text>
        </View>
      )}

      {/* Completion Badge */}
      {isComplete && (
        <View className="self-start">
          <View className="bg-success/10 border border-success/20 rounded-full px-2 py-1">
            <Text className="text-xs font-medium text-success">
              ✓ Goal Achieved!
            </Text>
          </View>
        </View>
      )}
    </View>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';

export { ProgressIndicator };