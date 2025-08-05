import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../providers/theme-provider';

export const ThemeDebug = () => {
  const { theme, actualTheme, systemTheme } = useTheme();

  return (
    <View className="p-4 space-y-2 border border-border rounded-lg">
      <Text className="text-lg font-bold text-foreground">Theme Debug</Text>
      <Text className="text-foreground">Theme: {theme}</Text>
      <Text className="text-foreground">System: {systemTheme}</Text>
      <Text className="text-foreground">Actual: {actualTheme}</Text>
      
      {/* Test semantic colors */}
      <View className="space-y-1 mt-4">
        <Text className="text-sm font-medium text-foreground">Color Tests:</Text>
        <View className="h-8 bg-background border border-border rounded">
          <Text className="text-foreground p-1">Background</Text>
        </View>
        <View className="h-8 bg-primary rounded">
          <Text className="text-primary-foreground p-1">Primary</Text>
        </View>
        <View className="h-8 bg-secondary rounded">
          <Text className="text-secondary-foreground p-1">Secondary</Text>
        </View>
        <View className="h-8 bg-muted rounded">
          <Text className="text-muted-foreground p-1">Muted</Text>
        </View>
      </View>
    </View>
  );
};