import React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button, ButtonText } from './button';
import { Progress } from './progress';
import { cn, formatDuration, formatNumber } from '../../lib/utils';

export interface WorkoutCardProps extends PressableProps {
  title: string;
  description?: string;
  duration?: number;
  exercises?: number;
  calories?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  progress?: number;
  completed?: boolean;
  className?: string;
  onStart?: () => void;
  onContinue?: () => void;
}

const difficultyColors = {
  beginner: 'bg-success text-success-foreground',
  intermediate: 'bg-warning text-warning-foreground',
  advanced: 'bg-destructive text-destructive-foreground',
};

const WorkoutCard = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  WorkoutCardProps
>(({
  title,
  description,
  duration,
  exercises,
  calories,
  difficulty = 'beginner',
  progress = 0,
  completed = false,
  className,
  onStart,
  onContinue,
  ...props
}, ref) => {
  const hasProgress = progress > 0 && progress < 100;
  const isCompleted = completed || progress >= 100;

  return (
    <Pressable ref={ref} className={cn('w-full', className)} {...props}>
      <Card className="w-full">
        <CardHeader className="pb-3">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <CardTitle className="text-lg font-bold mb-1">{title}</CardTitle>
              {description && (
                <Text className="text-sm text-muted-foreground">
                  {description}
                </Text>
              )}
            </View>
            
            <View className={cn(
              'px-2 py-1 rounded-full',
              difficultyColors[difficulty]
            )}>
              <Text className="text-xs font-medium capitalize">
                {difficulty}
              </Text>
            </View>
          </View>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Stats Row */}
          <View className="flex-row justify-between mb-4">
            {duration && (
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Duration</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {formatDuration(duration)}
                </Text>
              </View>
            )}
            
            {exercises && (
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Exercises</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {exercises}
                </Text>
              </View>
            )}
            
            {calories && (
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Calories</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {formatNumber(calories)}
                </Text>
              </View>
            )}
          </View>

          {/* Progress Section */}
          {(hasProgress || isCompleted) && (
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xs text-muted-foreground">Progress</Text>
                <Text className="text-xs font-medium text-foreground">
                  {Math.round(progress)}%
                </Text>
              </View>
              <Progress 
                value={progress} 
                className="h-2"
                indicatorClassName={isCompleted ? 'bg-success' : 'bg-primary'}
              />
            </View>
          )}

          {/* Action Button */}
          <View className="mt-4">
            {isCompleted ? (
              <Button 
                variant="outline" 
                className="w-full"
                onPress={onStart}
              >
                <ButtonText variant="outline">Restart Workout</ButtonText>
              </Button>
            ) : hasProgress ? (
              <Button 
                variant="default" 
                className="w-full"
                onPress={onContinue}
              >
                <ButtonText>Continue Workout</ButtonText>
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="w-full"
                onPress={onStart}
              >
                <ButtonText>Start Workout</ButtonText>
              </Button>
            )}
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
});

WorkoutCard.displayName = 'WorkoutCard';

export { WorkoutCard };