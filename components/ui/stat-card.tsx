import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Progress } from './progress';
import { cn, formatNumber, calculatePercentage } from '../../lib/utils';

export interface StatCardProps extends ViewProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  progress?: {
    current: number;
    target: number;
  };
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const variantStyles = {
  default: 'border-border',
  success: 'border-success/20 bg-success/5',
  warning: 'border-warning/20 bg-warning/5',
  destructive: 'border-destructive/20 bg-destructive/5',
  info: 'border-info/20 bg-info/5',
};

const variantValueColors = {
  default: 'text-foreground',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  info: 'text-info',
};

const sizeStyles = {
  sm: {
    card: 'p-4',
    title: 'text-sm',
    value: 'text-lg',
    unit: 'text-sm',
  },
  default: {
    card: 'p-6',
    title: 'text-sm',
    value: 'text-2xl',
    unit: 'text-lg',
  },
  lg: {
    card: 'p-8',
    title: 'text-base',
    value: 'text-3xl',
    unit: 'text-xl',
  },
};

const StatCard = React.forwardRef<React.ElementRef<typeof View>, StatCardProps>(
  ({
    title,
    value,
    unit,
    description,
    trend,
    progress,
    variant = 'default',
    size = 'default',
    className,
    ...props
  }, ref) => {
    const sizeStyle = sizeStyles[size];
    const progressPercentage = progress ? calculatePercentage(progress.current, progress.target) : 0;

    return (
      <Card
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        <CardContent className={cn('space-y-2', sizeStyle.card)}>
          {/* Title */}
          <Text className={cn(
            'font-medium text-muted-foreground',
            sizeStyle.title
          )}>
            {title}
          </Text>

          {/* Value */}
          <View className="flex-row items-baseline space-x-1">
            <Text className={cn(
              'font-bold',
              variantValueColors[variant],
              sizeStyle.value
            )}>
              {typeof value === 'number' ? formatNumber(value) : value}
            </Text>
            {unit && (
              <Text className={cn(
                'font-medium text-muted-foreground',
                sizeStyle.unit
              )}>
                {unit}
              </Text>
            )}
          </View>

          {/* Progress Bar */}
          {progress && (
            <View className="space-y-1">
              <Progress 
                value={progress.current} 
                max={progress.target}
                className="h-2"
                indicatorClassName={cn(
                  variant === 'success' && 'bg-success',
                  variant === 'warning' && 'bg-warning',
                  variant === 'destructive' && 'bg-destructive',
                  variant === 'info' && 'bg-info'
                )}
              />
              <Text className="text-xs text-muted-foreground">
                {formatNumber(progress.current)} / {formatNumber(progress.target)} ({progressPercentage}%)
              </Text>
            </View>
          )}

          {/* Trend */}
          {trend && (
            <View className="flex-row items-center space-x-1">
              <Text className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-success' : 'text-destructive'
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </Text>
              <Text className="text-xs text-muted-foreground">
                vs {trend.period}
              </Text>
            </View>
          )}

          {/* Description */}
          {description && (
            <Text className="text-xs text-muted-foreground">
              {description}
            </Text>
          )}
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';

export { StatCard };