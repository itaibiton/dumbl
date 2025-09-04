import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const WorkoutPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: 'apps', color: '#3b82f6' },
    { id: 'strength', name: 'Strength', icon: 'dumbbell', color: '#ef4444' },
    { id: 'cardio', name: 'Cardio', icon: 'run', color: '#10b981' },
    { id: 'flexibility', name: 'Flexibility', icon: 'yoga', color: '#8b5cf6' },
    { id: 'sports', name: 'Sports', icon: 'basketball', color: '#f97316' },
  ];

  const workoutPrograms = [
    {
      id: 1,
      name: 'Full Body Blast',
      duration: '45 min',
      difficulty: 'Intermediate',
      exercises: 8,
      category: 'strength',
      color: 'from-red-500 to-orange-500',
      icon: 'fitness',
    },
    {
      id: 2,
      name: 'HIIT Cardio',
      duration: '30 min',
      difficulty: 'Advanced',
      exercises: 6,
      category: 'cardio',
      color: 'from-green-500 to-teal-500',
      icon: 'timer',
    },
    {
      id: 3,
      name: 'Yoga Flow',
      duration: '20 min',
      difficulty: 'Beginner',
      exercises: 10,
      category: 'flexibility',
      color: 'from-purple-500 to-pink-500',
      icon: 'flower',
    },
    {
      id: 4,
      name: 'Upper Body Power',
      duration: '40 min',
      difficulty: 'Intermediate',
      exercises: 7,
      category: 'strength',
      color: 'from-blue-500 to-indigo-500',
      icon: 'body',
    },
  ];

  const recentWorkouts = [
    { name: 'Morning Yoga', time: 'Today, 7:00 AM', duration: '30 min' },
    { name: 'Leg Day', time: 'Yesterday, 6:00 PM', duration: '45 min' },
    { name: 'Quick Cardio', time: '2 days ago', duration: '20 min' },
  ];

  const filteredPrograms =
    selectedCategory === 'all'
      ? workoutPrograms
      : workoutPrograms.filter((p) => p.category === selectedCategory);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <LinearGradient colors={['#3b82f6', '#8b5cf6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <SafeAreaView edges={['top']}>
            <View className="px-6 pb-2 pt-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-white">Workouts</Text>
                <TouchableOpacity className="rounded-full bg-white/20 p-2">
                  <Ionicons name="search" size={20} color="white" />
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
          {/* Start Workout Button */}
          <View className="px-6 pt-4">
            <TouchableOpacity className="mb-6 overflow-hidden rounded-2xl shadow-lg">
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-between p-5"
              >
                <View className="flex-row items-center">
                  <View className="mr-4 rounded-full bg-white/20 p-3">
                    <Ionicons name="play" size={28} color="white" />
                  </View>
                  <View>
                    <Text className="text-xl font-bold text-white">Quick Start</Text>
                    <Text className="text-sm text-white/80">Begin a new workout</Text>
                  </View>
                </View>
                <Ionicons name="arrow-forward" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Categories */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold text-gray-900">Categories</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3">
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.id)}
                    className={`mr-3 rounded-xl px-4 py-3 ${
                      selectedCategory === category.id ? 'bg-blue-500' : 'bg-white'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <MaterialCommunityIcons
                        name={category.icon as any}
                        size={20}
                        color={selectedCategory === category.id ? 'white' : category.color}
                      />
                      <Text
                        className={`ml-2 font-medium ${
                          selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {category.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Workout Programs */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold text-gray-900">Workout Programs</Text>
              <View className="gap-3">
                {filteredPrograms.map((program) => (
                  <TouchableOpacity
                    key={program.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-md"
                  >
                    <LinearGradient
                      colors={
                        program.color.includes('red')
                          ? ['#ef4444', '#f97316']
                          : program.color.includes('green')
                            ? ['#10b981', '#14b8a6']
                            : program.color.includes('purple')
                              ? ['#8b5cf6', '#ec4899']
                              : ['#3b82f6', '#6366f1']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View className="flex-row items-start justify-between p-4">
                        <View className="flex-1">
                          <Text className="text-xl font-bold text-white">{program.name}</Text>
                          <View className="mt-2 flex-row items-center">
                            <View className="mr-4 flex-row items-center">
                              <Ionicons name="time-outline" size={16} color="white" />
                              <Text className="ml-1 text-sm text-white/90">{program.duration}</Text>
                            </View>
                            <View className="mr-4 flex-row items-center">
                              <Ionicons name="flash-outline" size={16} color="white" />
                              <Text className="ml-1 text-sm text-white/90">
                                {program.difficulty}
                              </Text>
                            </View>
                            <View className="flex-row items-center">
                              <Ionicons name="list-outline" size={16} color="white" />
                              <Text className="ml-1 text-sm text-white/90">
                                {program.exercises} exercises
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View className="rounded-full bg-white/20 p-3">
                          <Ionicons name={program.icon as any} size={24} color="white" />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Workouts */}
            <View>
              <Text className="mb-3 text-lg font-bold text-gray-900">Recent Workouts</Text>
              <View className="rounded-2xl bg-white p-4 shadow-md">
                {recentWorkouts.map((workout, index) => (
                  <View key={index}>
                    <TouchableOpacity className="flex-row items-center justify-between py-3">
                      <View className="flex-row items-center">
                        <View className="mr-3 rounded-xl bg-gray-100 p-2">
                          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                        </View>
                        <View>
                          <Text className="font-semibold text-gray-900">{workout.name}</Text>
                          <Text className="text-sm text-gray-500">{workout.time}</Text>
                        </View>
                      </View>
                      <Text className="text-sm font-medium text-gray-600">{workout.duration}</Text>
                    </TouchableOpacity>
                    {index < recentWorkouts.length - 1 && (
                      <View className="ml-11 h-px bg-gray-100" />
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Create Custom Workout */}
            <TouchableOpacity className="mt-6 flex-row items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4">
              <Ionicons name="add-circle-outline" size={24} color="#6b7280" />
              <Text className="ml-2 font-semibold text-gray-600">Create Custom Workout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default WorkoutPage;
