import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface ProgressProps extends ViewProps {
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof View>, ProgressProps>(
  ({ className, value = 0, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <View
        ref={ref}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
          className
        )}
        {...props}
      >
        <View
          className={cn(
            'h-full w-full flex-1 bg-primary transition-all duration-300',
            indicatorClassName
          )}
          style={{ 
            transform: [{ translateX: `${percentage - 100}%` }] as any
          }}
        />
      </View>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };