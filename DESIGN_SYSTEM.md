# Dumbl Design System

A complete shadcn-style design system for React Native fitness apps using NativeWind v4.

## 🎨 Overview

This design system provides a comprehensive set of UI components and utilities that follow shadcn/ui patterns, specifically optimized for React Native and fitness applications.

## 🔧 Installation & Setup

All components are already set up in your project. The design system includes:

- **CSS Variables**: Semantic color tokens that automatically adapt to light/dark themes
- **TailwindCSS Configuration**: Extended with custom colors, animations, and utilities
- **Theme Provider**: Context-based theme management with system detection
- **Component Library**: Reusable, accessible components with consistent styling
- **Utility Functions**: Helper functions for class merging and variants

## 🌈 Color System

### Semantic Colors

The design system uses CSS variables for consistent theming:

```css
/* Light Theme */
--background: 0 0% 100%
--foreground: 222.2 84% 4.9%
--primary: 222.2 47.4% 11.2%
--primary-foreground: 210 40% 98%
--secondary: 210 40% 96%
--secondary-foreground: 222.2 84% 4.9%

/* Fitness-specific */
--success: 142 76% 36%
--warning: 38 92% 50%
--info: 221 83% 53%
```

### Usage in Components

```tsx
// Use semantic classes
<View className="bg-background border-border">
  <Text className="text-foreground">Hello World</Text>
</View>

// Use variant props
<Button variant="success">Complete Workout</Button>
<StatCard variant="warning" title="Calories" value={1850} />
```

## 🧩 Core Components

### Button

Versatile button component with multiple variants and sizes:

```tsx
<Button variant="default" size="lg" onPress={handlePress}>
  <ButtonText>Start Workout</ButtonText>
</Button>

<Button variant="outline" size="sm">
  <ButtonText variant="outline" size="sm">Cancel</ButtonText>
</Button>

// Fitness-specific variants
<Button variant="success">Complete Set</Button>
<Button variant="warning">Take Break</Button>
```

**Variants**: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link` | `success` | `warning` | `info`
**Sizes**: `default` | `sm` | `lg` | `xl` | `icon`

### Card

Container component for grouping related content:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Workout Summary</CardTitle>
    <CardDescription>Today's training session</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Content goes here</Text>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input

Form input component with consistent styling:

```tsx
<Input
  placeholder="Enter workout name"
  value={workoutName}
  onChangeText={setWorkoutName}
  className="mb-4"
/>
```

### Badge

Small status indicators:

```tsx
<Badge variant="success">Completed</Badge>
<Badge variant="warning">In Progress</Badge>
<Badge variant="destructive">Failed</Badge>
```

### Progress

Progress bars for tracking completion:

```tsx
<Progress value={75} max={100} className="h-2" />

// With custom styling
<Progress 
  value={current} 
  max={target}
  indicatorClassName="bg-success"
/>
```

## 🏋️ Fitness Components

### WorkoutCard

Comprehensive workout display component:

```tsx
<WorkoutCard
  title="Upper Body Strength"
  description="Build muscle in chest, shoulders, and arms"
  duration={2700} // seconds
  exercises={8}
  calories={320}
  difficulty="intermediate"
  progress={65}
  onStart={() => startWorkout()}
  onContinue={() => continueWorkout()}
/>
```

**Props**:
- `title`, `description`: Basic info
- `duration`, `exercises`, `calories`: Workout metrics
- `difficulty`: `beginner` | `intermediate` | `advanced`
- `progress`: 0-100 completion percentage
- `completed`: Boolean for finished workouts
- `onStart`, `onContinue`: Action handlers

### StatCard

Display key metrics and KPIs:

```tsx
<StatCard
  title="Daily Steps"
  value={8540}
  unit="steps"
  variant="info"
  progress={{
    current: 8540,
    target: 10000
  }}
  trend={{
    value: 15,
    isPositive: true,
    period: "yesterday"
  }}
/>
```

**Features**:
- Automatic number formatting (8.5K, 2.8M)
- Progress bars with targets
- Trend indicators with directional arrows
- Multiple size variants

### ProgressIndicator

Standalone progress tracking:

```tsx
<ProgressIndicator
  label="Weekly Goal"
  current={4}
  target={5}
  unit="workouts"
  variant="success"
  size="lg"
  showPercentage={true}
  showValues={true}
/>
```

**Features**:
- Automatic percentage calculation
- Goal achievement badges
- Customizable styling
- Multiple size options

## 🎨 Theme System

### ThemeProvider

Wrap your app with the theme provider:

```tsx
import { ThemeProvider } from '@/providers/theme-provider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dumbl-theme">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### useTheme Hook

Access and control themes:

```tsx
import { useTheme } from '@/providers/theme-provider';

function MyComponent() {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();
  
  return (
    <Button onPress={toggleTheme}>
      <ButtonText>
        Switch to {actualTheme === 'light' ? 'Dark' : 'Light'}
      </ButtonText>
    </Button>
  );
}
```

### ThemeToggle Component

Pre-built theme switching components:

```tsx
// Icon toggle
<ThemeToggle variant="icon" />

// Badge toggle
<ThemeToggle variant="badge" />

// Full selector with system option
<ThemeToggle variant="button" />
```

## 🛠️ Utilities

### Class Name Utility (cn)

Merge classes conditionally:

```tsx
import { cn } from '@/lib/utils';

<View className={cn(
  'bg-card rounded-lg p-4',
  isActive && 'border-primary',
  className
)} />
```

### Class Variance Authority (cva)

Create component variants:

```tsx
import { cva, type VariantProps } from '@/lib/utils';

const alertVariants = cva(
  'p-4 rounded-lg border',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'bg-destructive/10 text-destructive border-destructive/20',
      },
      size: {
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface AlertProps extends VariantProps<typeof alertVariants> {
  children: React.ReactNode;
  className?: string;
}

function Alert({ variant, size, className, children }: AlertProps) {
  return (
    <View className={cn(alertVariants({ variant, size }), className)}>
      {children}
    </View>
  );
}
```

### Helper Functions

```tsx
import { formatNumber, formatDuration, calculatePercentage } from '@/lib/utils';

formatNumber(8540); // "8.5K"
formatDuration(2700); // "45m 0s"
calculatePercentage(75, 100); // 75
```

## 📱 Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<View className="p-4 md:p-6 lg:p-8">
  <Text className="text-lg md:text-xl lg:text-2xl">
    Responsive Text
  </Text>
</View>
```

## 🎯 Best Practices

### Component Structure
- Always use semantic color classes (`bg-background`, `text-foreground`)
- Implement proper TypeScript interfaces
- Include className prop for customization
- Use forwardRef for proper ref forwarding

### Theme Consistency
- Stick to the design system's color palette
- Use CSS variables instead of hardcoded colors
- Test components in both light and dark themes
- Provide proper contrast ratios

### Performance
- Use `cn()` utility for conditional classes
- Implement proper memoization for complex components
- Avoid inline styles when possible
- Leverage NativeWind's optimization

### Accessibility
- Include proper ARIA labels where applicable
- Ensure adequate color contrast
- Support keyboard navigation
- Provide alternative text for icons

## 🔮 Extending the System

### Adding New Components

1. Create component in `/components/ui/`
2. Use existing patterns (cva, variants, forwardRef)
3. Export from `/components/ui/index.ts`
4. Follow naming conventions

### Custom Colors

Add to `tailwind.config.js`:

```js
colors: {
  'custom-color': {
    DEFAULT: 'hsl(var(--custom-color))',
    foreground: 'hsl(var(--custom-color-foreground))',
  }
}
```

Add CSS variables to `global.css`:

```css
:root {
  --custom-color: 200 100% 50%;
  --custom-color-foreground: 0 0% 100%;
}
```

## 📚 Examples

See the implemented screens for complete examples:
- **Home**: `/app/(auth)/(tabs)/home/index.tsx`
- **Profile**: `/app/(auth)/(tabs)/profile/index.tsx`

These showcase real-world usage of all components and patterns.