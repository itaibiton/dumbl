import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import {
    WorkoutCard,
    StatCard,
    ProgressIndicator,
    Button,
    ButtonText,
    ThemeToggle,
    Separator
} from '@/components/ui';

const HomePage = () => {
    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-6 space-y-6">
                <Text className="text-3xl text-danger">Itai text tset</Text>
                {/* Header */}
                <View className="flex-row items-center justify-between  mb-4">
                    <View>
                        <Text className="text-2xl font-bold text-foreground">
                            Welcome back!
                        </Text>
                        <Text className="text-muted-foreground">
                            Ready to crush your fitness goals?
                        </Text>
                    </View>
                    <ThemeToggle variant="icon" />
                </View>

                <Separator />

                {/* Stats Row */}
                <View className="flex-row space-x-4">
                    <StatCard
                        title="Workouts"
                        value={12}
                        description="This week"
                        variant="success"
                        size="sm"
                        className="flex-1"
                        trend={{
                            value: 20,
                            isPositive: true,
                            period: 'last week'
                        }}
                    />
                    <StatCard
                        title="Calories"
                        value={2840}
                        unit="kcal"
                        description="Today"
                        variant="warning"
                        size="sm"
                        className="flex-1"
                    />
                </View>

                {/* Progress Indicators */}
                <View className="space-y-4">
                    <Text className="text-lg font-semibold text-foreground">
                        Today's Progress
                    </Text>

                    <ProgressIndicator
                        label="Daily Calories"
                        current={1850}
                        target={2200}
                        unit="kcal"
                        variant="success"
                    />

                    <ProgressIndicator
                        label="Water Intake"
                        current={6}
                        target={8}
                        unit="glasses"
                        variant="info"
                        size="sm"
                    />

                    <ProgressIndicator
                        label="Steps"
                        current={8540}
                        target={10000}
                        unit="steps"
                        variant="warning"
                        size="sm"
                    />
                </View>

                <Separator />

                {/* Featured Workout */}
                <View className="space-y-4">
                    <Text className="text-lg font-semibold text-foreground">
                        Today's Workout
                    </Text>

                    <WorkoutCard
                        title="Upper Body Strength"
                        description="Build muscle and strength in your chest, shoulders, and arms"
                        duration={2700} // 45 minutes
                        exercises={8}
                        calories={320}
                        difficulty="intermediate"
                        progress={0}
                        onStart={() => console.log('Starting workout...')}
                    />
                </View>

                {/* Recent Workouts */}
                <View className="space-y-4">
                    <Text className="text-lg font-semibold text-foreground">
                        Continue Training
                    </Text>

                    <WorkoutCard
                        title="HIIT Cardio Blast"
                        description="High-intensity interval training to torch calories"
                        duration={1800} // 30 minutes
                        exercises={6}
                        calories={280}
                        difficulty="advanced"
                        progress={65}
                        onContinue={() => console.log('Continuing workout...')}
                    />

                    <WorkoutCard
                        title="Core & Flexibility"
                        description="Strengthen your core and improve flexibility"
                        duration={1200} // 20 minutes
                        exercises={4}
                        calories={150}
                        difficulty="beginner"
                        progress={100}
                        completed={true}
                        onStart={() => console.log('Restarting workout...')}
                    />
                </View>

                {/* Quick Actions */}
                <View className="flex-row space-x-3">
                    <Button variant="default" className="flex-1">
                        <ButtonText>Start Quick Workout</ButtonText>
                    </Button>
                    <Button variant="outline" className="flex-1">
                        <ButtonText variant="outline">View All Workouts</ButtonText>
                    </Button>
                </View>

                <View className="pb-8" />
            </View>
        </ScrollView>
    );
};

export default HomePage;