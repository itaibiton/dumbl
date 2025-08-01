import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../providers/theme-provider';
import { Button, ButtonText } from './button';
import { Badge } from './badge';
import { cn } from '../../lib/utils';

export interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'badge' | 'icon';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className, 
  variant = 'button' 
}) => {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'badge') {
    return (
      <Pressable onPress={toggleTheme} className={className}>
        <Badge variant="outline">
          {actualTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </Badge>
      </Pressable>
    );
  }

  if (variant === 'icon') {
    return (
      <Pressable 
        onPress={toggleTheme}
        className={cn(
          'h-10 w-10 items-center justify-center rounded-md border border-input bg-background active:bg-accent',
          className
        )}
      >
        <Text className="text-lg">
          {actualTheme === 'dark' ? '☀️' : '🌙'}
        </Text>
      </Pressable>
    );
  }

  // Full theme selector with system option
  return (
    <View className={cn('space-y-2', className)}>
      <Text className="text-sm font-medium text-foreground">Theme</Text>
      <View className="flex-row space-x-2">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          size="sm"
          onPress={() => setTheme('light')}
        >
          <ButtonText 
            variant={theme === 'light' ? 'default' : 'outline'}
            size="sm"
          >
            ☀️ Light
          </ButtonText>
        </Button>
        
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          size="sm"
          onPress={() => setTheme('dark')}
        >
          <ButtonText 
            variant={theme === 'dark' ? 'default' : 'outline'}
            size="sm"
          >
            🌙 Dark
          </ButtonText>
        </Button>
        
        <Button
          variant={theme === 'system' ? 'default' : 'outline'}
          size="sm"
          onPress={() => setTheme('system')}
        >
          <ButtonText 
            variant={theme === 'system' ? 'default' : 'outline'}
            size="sm"
          >
            💻 System
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

export { ThemeToggle };