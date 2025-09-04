import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';
import { useUserSync } from '@/hooks/useUserSync';
import { SignOutButton } from '@/components/SignOutButton';

const ProfilePage = () => {
  const { user: clerkUser } = useUser();
  const { convexUser, syncStatus, lastSyncError, syncRetries, isLoading } = useUserSync();
  
  const userEmail = convexUser?.email || clerkUser?.emailAddresses[0]?.emailAddress || 'No email';
  const userName = convexUser?.name || clerkUser?.fullName || clerkUser?.firstName || 'User';
  
  // Mock fitness data
  const stats = {
    workouts: 142,
    streak: 12,
    calories: 45280,
    hours: 89,
  };
  
  const achievements = [
    { id: 1, name: '7 Day Streak', icon: 'flame', color: '#f97316', earned: true },
    { id: 2, name: '100 Workouts', icon: 'trophy', color: '#fbbf24', earned: true },
    { id: 3, name: 'Early Bird', icon: 'sunny', color: '#60a5fa', earned: true },
    { id: 4, name: 'Night Owl', icon: 'moon', color: '#8b5cf6', earned: false },
    { id: 5, name: 'Marathon', icon: 'medal', color: '#10b981', earned: false },
    { id: 6, name: 'Powerlifter', icon: 'barbell', color: '#ef4444', earned: false },
  ];
  
  const settingsOptions = [
    { id: 1, name: 'Notifications', icon: 'notifications-outline', color: '#3b82f6' },
    { id: 2, name: 'Units & Measurements', icon: 'speedometer-outline', color: '#8b5cf6' },
    { id: 3, name: 'Privacy & Security', icon: 'lock-closed-outline', color: '#10b981' },
    { id: 4, name: 'Connected Apps', icon: 'link-outline', color: '#f97316' },
    { id: 5, name: 'Help & Support', icon: 'help-circle-outline', color: '#6b7280' },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="flex-1 bg-gray-50">
        {/* Header with Profile Info */}
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <SafeAreaView edges={['top']}>
            <View className="px-6 pb-2 pt-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-white">Profile</Text>
                <TouchableOpacity className="rounded-full bg-white/20 p-2">
                  <Ionicons name="settings-outline" size={20} color="white" />
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
            {/* User Info Card */}
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-md">
              <View className="flex-row items-center">
                <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                  <Text className="text-2xl font-bold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">{userName}</Text>
                  <Text className="text-sm text-gray-500">{userEmail}</Text>
                  <View className="mt-1 flex-row items-center">
                    {syncStatus === 'loading' ? (
                      <ActivityIndicator size="small" color="#6b7280" />
                    ) : syncStatus === 'synced' ? (
                      <>
                        <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                        <Text className="ml-1 text-xs text-gray-500">Synced</Text>
                      </>
                    ) : syncStatus === 'error' ? (
                      <>
                        <Ionicons name="alert-circle" size={14} color="#ef4444" />
                        <Text className="ml-1 text-xs text-gray-500">Sync Error</Text>
                      </>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
            
            {/* Stats Grid */}
            <View className="mb-6 rounded-2xl bg-white p-4 shadow-lg">
              <Text className="mb-4 text-lg font-bold text-gray-900">Fitness Stats</Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 p-2">
                  <View className="items-center">
                    <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                      <Ionicons name="barbell" size={24} color="#3b82f6" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900">{stats.workouts}</Text>
                    <Text className="text-xs text-gray-500">Total Workouts</Text>
                  </View>
                </View>
                
                <View className="w-1/2 p-2">
                  <View className="items-center">
                    <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                      <Ionicons name="flame" size={24} color="#f97316" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900">{stats.streak}</Text>
                    <Text className="text-xs text-gray-500">Day Streak</Text>
                  </View>
                </View>
                
                <View className="w-1/2 p-2">
                  <View className="items-center">
                    <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                      <Ionicons name="flash" size={24} color="#10b981" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900">{(stats.calories / 1000).toFixed(1)}k</Text>
                    <Text className="text-xs text-gray-500">Calories Burned</Text>
                  </View>
                </View>
                
                <View className="w-1/2 p-2">
                  <View className="items-center">
                    <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                      <Ionicons name="time" size={24} color="#8b5cf6" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900">{stats.hours}</Text>
                    <Text className="text-xs text-gray-500">Hours Trained</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Achievements */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold text-gray-900">Achievements</Text>
              <View className="rounded-2xl bg-white p-4 shadow-md">
                <View className="flex-row flex-wrap">
                  {achievements.map((achievement) => (
                    <View key={achievement.id} className="w-1/3 p-2">
                      <View className={`items-center rounded-xl p-3 ${
                        achievement.earned ? 'bg-gray-50' : 'bg-gray-100 opacity-50'
                      }`}>
                        <Ionicons 
                          name={achievement.icon as any} 
                          size={28} 
                          color={achievement.earned ? achievement.color : '#9ca3af'} 
                        />
                        <Text className={`mt-1 text-center text-xs ${
                          achievement.earned ? 'font-medium text-gray-700' : 'text-gray-400'
                        }`}>
                          {achievement.name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Settings Options */}
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold text-gray-900">Settings</Text>
              <View className="rounded-2xl bg-white shadow-md">
                {settingsOptions.map((option, index) => (
                  <TouchableOpacity 
                    key={option.id}
                    className="flex-row items-center justify-between px-4 py-4"
                  >
                    <View className="flex-row items-center">
                      <View 
                        className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${option.color}20` }}
                      >
                        <Ionicons name={option.icon as any} size={20} color={option.color} />
                      </View>
                      <Text className="font-medium text-gray-900">{option.name}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Account Info */}
            {convexUser && (
              <View className="mb-6 rounded-2xl bg-white p-4 shadow-md">
                <Text className="mb-3 text-lg font-bold text-gray-900">Account Details</Text>
                <View className="space-y-2">
                  <View className="flex-row justify-between py-2">
                    <Text className="text-sm text-gray-500">User ID</Text>
                    <Text className="text-sm font-medium text-gray-700">{convexUser._id.slice(0, 8)}...</Text>
                  </View>
                  <View className="flex-row justify-between py-2">
                    <Text className="text-sm text-gray-500">Member Since</Text>
                    <Text className="text-sm font-medium text-gray-700">
                      {new Date(convexUser.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="flex-row justify-between py-2">
                    <Text className="text-sm text-gray-500">Last Updated</Text>
                    <Text className="text-sm font-medium text-gray-700">
                      {new Date(convexUser.updatedAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Sign Out Button */}
            <View className="mb-6">
              <SignOutButton />
            </View>

            {/* App Version */}
            <View className="items-center py-4">
              <Text className="text-xs text-gray-400">Dumbl Fitness App</Text>
              <Text className="text-xs text-gray-400">Version 1.0.0</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ProfilePage;