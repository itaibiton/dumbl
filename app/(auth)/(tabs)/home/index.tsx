import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';

const HomePage = () => {
  const { user } = useUser();
  const firstName = user?.firstName || 'Champion';
  
  // Mock data for now - this would come from your backend
  const todayWorkouts = 1;
  const weekStreak = 5;
  const totalCalories = 1250;
  const monthlyGoal = 20;
  const monthlyComplete = 12;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="flex-1 bg-gray-50">
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <SafeAreaView edges={['top']}>
            <View className="px-6 pb-2 pt-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-xl font-bold text-white">Hi {firstName}! 💪</Text>
                </View>
                <TouchableOpacity className="rounded-full bg-white/20 p-2">
                  <Ionicons name="notifications-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-6 pt-4">
            {/* Today's Goal Card */}
            <View className="mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg">
              <Text className="mb-2 text-sm font-medium text-white/90">Today's Goal</Text>
              <View className="mb-3 flex-row items-end justify-between">
                <Text className="text-3xl font-bold text-white">{todayWorkouts}</Text>
                <Text className="mb-1 text-white/80">workout completed</Text>
              </View>
              <View className="h-2 overflow-hidden rounded-full bg-white/30">
                <View className="h-full w-1/2 rounded-full bg-white" />
              </View>
            </View>
            
            {/* Stats Cards */}
            <View className="mb-6 flex-row gap-4">
              <View className="flex-1 rounded-2xl bg-white p-4 shadow-lg">
                <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <Ionicons name="flame" size={20} color="#f97316" />
                </View>
                <Text className="text-xs font-medium text-gray-500">Streak</Text>
                <Text className="text-2xl font-bold text-gray-900">{weekStreak} days</Text>
              </View>
              
              <View className="flex-1 rounded-2xl bg-white p-4 shadow-lg">
                <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <Ionicons name="flash" size={20} color="#10b981" />
                </View>
                <Text className="text-xs font-medium text-gray-500">Calories</Text>
                <Text className="text-2xl font-bold text-gray-900">{totalCalories}</Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold text-gray-900">Quick Start</Text>
              <View className="gap-3">
                <TouchableOpacity className="flex-row items-center justify-between rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 shadow-md">
                  <View className="flex-row items-center">
                    <View className="mr-4 rounded-xl bg-white/20 p-3">
                      <Ionicons name="barbell" size={24} color="white" />
                    </View>
                    <View>
                      <Text className="text-lg font-bold text-white">Start Workout</Text>
                      <Text className="text-sm text-white/80">Begin your training session</Text>
                    </View>
                  </View>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
                
                <View className="flex-row gap-3">
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-xl bg-purple-500 p-3 shadow-md">
                    <Ionicons name="timer-outline" size={20} color="white" />
                    <Text className="ml-2 font-semibold text-white">Quick Timer</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-xl bg-teal-500 p-3 shadow-md">
                    <Ionicons name="analytics-outline" size={20} color="white" />
                    <Text className="ml-2 font-semibold text-white">Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Monthly Progress */}
            <View className="mb-6 rounded-2xl bg-white p-5 shadow-md">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-lg font-bold text-gray-900">Monthly Goal</Text>
                <Text className="text-sm font-medium text-purple-600">
                  {monthlyComplete}/{monthlyGoal} workouts
                </Text>
              </View>
              <View className="mb-2 h-3 overflow-hidden rounded-full bg-gray-200">
                <View 
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" 
                  style={{ width: `${(monthlyComplete / monthlyGoal) * 100}%` }}
                />
              </View>
              <Text className="text-xs text-gray-500">
                {monthlyGoal - monthlyComplete} workouts to reach your goal
              </Text>
            </View>

            {/* Recent Activity */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold text-gray-900">Recent Activity</Text>
              <View className="gap-3">
                <View className="flex-row items-center rounded-xl bg-white p-4 shadow-md">
                  <View className="mr-3 rounded-xl bg-blue-100 p-2">
                    <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900">Upper Body Strength</Text>
                    <Text className="text-sm text-gray-500">Today • 45 min • 320 cal</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center rounded-xl bg-white p-4 shadow-md">
                  <View className="mr-3 rounded-xl bg-green-100 p-2">
                    <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900">HIIT Cardio</Text>
                    <Text className="text-sm text-gray-500">Yesterday • 30 min • 280 cal</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center rounded-xl bg-white p-4 shadow-md">
                  <View className="mr-3 rounded-xl bg-purple-100 p-2">
                    <Ionicons name="checkmark-circle" size={24} color="#8b5cf6" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900">Core & Flexibility</Text>
                    <Text className="text-sm text-gray-500">2 days ago • 20 min • 150 cal</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Motivational Quote */}
            <View className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-5 shadow-lg">
              <Text className="mb-2 text-lg font-bold text-white">Daily Motivation</Text>
              <Text className="text-sm italic text-white/90">
                "The only bad workout is the one that didn't happen."
              </Text>
              <Text className="mt-2 text-xs text-white/70">- Unknown</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomePage;