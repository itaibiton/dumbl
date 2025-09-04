import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-b-3xl px-6 pb-10 pt-6 shadow-lg"
        >
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-red-500 opacity-90">Welcome back!</Text>
              <Text className="text-3xl font-bold text-white">NativeWind Demo</Text>
            </View>
            <View className="rounded-full bg-white/20 p-3">
              <Ionicons name="notifications-outline" size={24} color="white" />
            </View>
          </View>

          <Text className="text-base leading-relaxed text-white/90">
            Experience the power of Tailwind CSS in React Native
          </Text>
        </LinearGradient>

        <View className="-mt-4 px-6">
          {/* Stats Cards */}
          <View className="mb-6 flex-row gap-4">
            <View className="flex-1 rounded-2xl bg-white p-4 shadow-md">
              <View className="mb-3 h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Ionicons name="flash" size={24} color="#3b82f6" />
              </View>
              <Text className="mb-1 text-xs text-gray-500">Active</Text>
              <Text className="text-2xl font-bold text-gray-800">142</Text>
            </View>

            <View className="flex-1 rounded-2xl bg-white p-4 shadow-md">
              <View className="mb-3 h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <Ionicons name="trending-up" size={24} color="#8b5cf6" />
              </View>
              <Text className="mb-1 text-xs text-gray-500">Progress</Text>
              <Text className="text-2xl font-bold text-gray-800">89%</Text>
            </View>
          </View>

          {/* Typography Examples */}
          <View className="mb-6 rounded-2xl bg-white p-6 shadow-md">
            <Text className="mb-4 text-xl font-bold text-gray-800">Typography Showcase</Text>

            <Text className="mb-2 text-4xl font-bold text-blue-600">Heading 1</Text>
            <Text className="mb-2 text-3xl font-semibold text-purple-600">Heading 2</Text>
            <Text className="mb-2 text-2xl font-medium text-pink-600">Heading 3</Text>
            <Text className="mb-2 text-xl text-gray-700">Heading 4</Text>
            <Text className="mb-2 text-base text-gray-600">Regular body text</Text>
            <Text className="mb-2 text-sm text-gray-500">Small text</Text>
            <Text className="text-xs text-gray-400">Extra small text</Text>
          </View>

          {/* Color Palette */}
          <View className="mb-6 rounded-2xl bg-white p-6 shadow-md">
            <Text className="mb-4 text-xl font-bold text-gray-800">Color Palette</Text>

            <View className="flex-row flex-wrap gap-3">
              <View className="h-16 w-16 rounded-xl bg-red-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-orange-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-amber-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-yellow-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-lime-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-green-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-emerald-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-teal-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-cyan-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-sky-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-blue-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-indigo-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-violet-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-purple-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-fuchsia-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-pink-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-rose-500 shadow-sm" />
              <View className="h-16 w-16 rounded-xl bg-gray-500 shadow-sm" />
            </View>
          </View>

          {/* Button Variants */}
          <View className="mb-6 rounded-2xl bg-white p-6 shadow-md">
            <Text className="mb-4 text-xl font-bold text-gray-800">Button Variants</Text>

            <TouchableOpacity className="mb-3 rounded-xl bg-blue-600 px-6 py-3 shadow-sm active:bg-blue-700">
              <Text className="text-center font-semibold text-white">Primary Button</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mb-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 shadow-sm">
              <Text className="text-center font-semibold text-white">Gradient Button</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mb-3 rounded-xl border-2 border-blue-600 px-6 py-3">
              <Text className="text-center font-semibold text-blue-600">Outline Button</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mb-3 rounded-xl bg-gray-200 px-6 py-3">
              <Text className="text-center font-semibold text-gray-700">Secondary Button</Text>
            </TouchableOpacity>

            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 rounded-lg bg-green-500 px-4 py-2">
                <Text className="text-center text-sm font-medium text-white">Success</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 rounded-lg bg-yellow-500 px-4 py-2">
                <Text className="text-center text-sm font-medium text-white">Warning</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 rounded-lg bg-red-500 px-4 py-2">
                <Text className="text-center text-sm font-medium text-white">Danger</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Spacing & Layout */}
          <View className="mb-6 rounded-2xl bg-white p-6 shadow-md">
            <Text className="mb-4 text-xl font-bold text-gray-800">Spacing & Layout</Text>

            <Text className="mb-3 text-sm text-gray-600">Flex Row with Gap</Text>
            <View className="mb-4 flex-row gap-2">
              <View className="h-12 flex-1 rounded-lg bg-blue-200" />
              <View className="h-12 flex-1 rounded-lg bg-blue-300" />
              <View className="h-12 flex-1 rounded-lg bg-blue-400" />
            </View>

            <Text className="mb-3 text-sm text-gray-600">Different Padding</Text>
            <View className="mb-2 rounded-lg bg-purple-100 p-2">
              <Text className="text-xs text-purple-700">p-2 (8px)</Text>
            </View>
            <View className="mb-2 rounded-lg bg-purple-200 p-4">
              <Text className="text-sm text-purple-700">p-4 (16px)</Text>
            </View>
            <View className="rounded-lg bg-purple-300 p-6">
              <Text className="text-purple-700">p-6 (24px)</Text>
            </View>
          </View>

          {/* Cards with Shadows */}
          <View className="mb-6">
            <Text className="mb-4 text-xl font-bold text-gray-800">Shadow Effects</Text>

            <View className="mb-3 rounded-xl bg-white p-4 shadow-sm">
              <Text className="text-gray-700">Small Shadow (shadow-sm)</Text>
            </View>

            <View className="mb-3 rounded-xl bg-white p-4 shadow-md">
              <Text className="text-gray-700">Medium Shadow (shadow-md)</Text>
            </View>

            <View className="mb-3 rounded-xl bg-white p-4 shadow-lg">
              <Text className="text-gray-700">Large Shadow (shadow-lg)</Text>
            </View>

            <View className="mb-3 rounded-xl bg-white p-4 shadow-xl">
              <Text className="text-gray-700">Extra Large Shadow (shadow-xl)</Text>
            </View>
          </View>

          {/* Border Radius Examples */}
          <View className="mb-6 rounded-2xl bg-white p-6 shadow-md">
            <Text className="mb-4 text-xl font-bold text-gray-800">Border Radius</Text>

            <View className="flex-row flex-wrap gap-3">
              <View className="h-20 w-20 rounded-none bg-gradient-to-br from-blue-400 to-blue-600" />
              <View className="h-20 w-20 rounded bg-gradient-to-br from-green-400 to-green-600" />
              <View className="h-20 w-20 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600" />
              <View className="h-20 w-20 rounded-2xl bg-gradient-to-br from-red-400 to-red-600" />
              <View className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
            </View>
          </View>

          {/* Feature List */}
          <View className="mb-6 rounded-2xl bg-white p-6 shadow-md">
            <Text className="mb-4 text-xl font-bold text-gray-800">NativeWind Features</Text>

            <View className="mb-3 flex-row items-center">
              <View className="mr-3 rounded-full bg-green-100 p-2">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
              <Text className="flex-1 text-gray-700">Utility-first CSS framework</Text>
            </View>

            <View className="mb-3 flex-row items-center">
              <View className="mr-3 rounded-full bg-green-100 p-2">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
              <Text className="flex-1 text-gray-700">Works with React Native</Text>
            </View>

            <View className="mb-3 flex-row items-center">
              <View className="mr-3 rounded-full bg-green-100 p-2">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
              <Text className="flex-1 text-gray-700">Hot reload support</Text>
            </View>

            <View className="mb-3 flex-row items-center">
              <View className="mr-3 rounded-full bg-green-100 p-2">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
              <Text className="flex-1 text-gray-700">TypeScript support</Text>
            </View>

            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-green-100 p-2">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
              <Text className="flex-1 text-gray-700">Responsive design</Text>
            </View>
          </View>

          {/* Footer */}
          <View className="items-center py-8">
            <Text className="text-sm text-gray-400">Made with NativeWind + Tailwind CSS</Text>
            <Text className="mt-1 text-xs text-gray-500">Version 4.1.23</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
