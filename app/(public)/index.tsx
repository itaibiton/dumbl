import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailSignIn = async () => {
        if (!isLoaded || isLoading) return;

        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        if (!password) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        setIsLoading(true);

        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password: password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
            } else {
                console.error('Sign in failed', signInAttempt);
                Alert.alert('Error', 'Sign in failed. Please check your credentials.');
            }
        } catch (err: any) {
            console.error('Sign in error', err);
            Alert.alert('Error', err.errors?.[0]?.message || 'Sign in failed');
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToRegister = () => {
        router.push('/(public)/register');
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#3b82f6', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1"
            >
                <SafeAreaView className="flex-1">
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        className="flex-1"
                    >
                        <ScrollView 
                            className="flex-1"
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View className="flex-1 justify-center px-6">
                                {/* Logo/Title Section */}
                                <View className="mb-10 items-center">
                                    <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-white/20">
                                        <Ionicons name="fitness" size={40} color="white" />
                                    </View>
                                    <Text className="text-4xl font-bold text-white">Dumbl</Text>
                                    <Text className="mt-2 text-white/80">Your Fitness Journey Starts Here</Text>
                                </View>

                                {/* Login Form */}
                                <View className="rounded-3xl bg-white/10 p-6 backdrop-blur-lg">
                                    <Text className="mb-6 text-center text-2xl font-bold text-white">Welcome Back</Text>
                                    
                                    {/* Email Input */}
                                    <View className="mb-4">
                                        <View className="flex-row items-center rounded-xl bg-white/20 px-4">
                                            <Ionicons name="mail-outline" size={20} color="white" />
                                            <TextInput
                                                className="flex-1 py-4 pl-3 text-white"
                                                placeholder="Email address"
                                                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                                value={email}
                                                onChangeText={setEmail}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                editable={!isLoading}
                                            />
                                        </View>
                                    </View>
                                    
                                    {/* Password Input */}
                                    <View className="mb-6">
                                        <View className="flex-row items-center rounded-xl bg-white/20 px-4">
                                            <Ionicons name="lock-closed-outline" size={20} color="white" />
                                            <TextInput
                                                className="flex-1 py-4 pl-3 text-white"
                                                placeholder="Password"
                                                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                                value={password}
                                                onChangeText={setPassword}
                                                secureTextEntry={!showPassword}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                editable={!isLoading}
                                            />
                                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                                <Ionicons 
                                                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                                                    size={20} 
                                                    color="white" 
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    
                                    {/* Sign In Button */}
                                    <TouchableOpacity 
                                        onPress={handleEmailSignIn}
                                        disabled={isLoading}
                                        className={`mb-4 overflow-hidden rounded-xl ${
                                            isLoading ? 'opacity-70' : ''
                                        }`}
                                    >
                                        <LinearGradient
                                            colors={['#10b981', '#059669']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            className="px-6 py-4"
                                        >
                                            {isLoading ? (
                                                <ActivityIndicator color="white" />
                                            ) : (
                                                <Text className="text-center text-lg font-bold text-white">
                                                    Sign In
                                                </Text>
                                            )}
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    
                                    {/* Forgot Password */}
                                    <TouchableOpacity className="mb-4">
                                        <Text className="text-center text-sm text-white/80">
                                            Forgot your password?
                                        </Text>
                                    </TouchableOpacity>
                                    
                                    {/* Divider */}
                                    <View className="my-4 flex-row items-center">
                                        <View className="h-px flex-1 bg-white/20" />
                                        <Text className="mx-4 text-white/60">OR</Text>
                                        <View className="h-px flex-1 bg-white/20" />
                                    </View>
                                    
                                    {/* Register Link */}
                                    <TouchableOpacity 
                                        onPress={navigateToRegister}
                                        disabled={isLoading}
                                        className="rounded-xl border border-white/30 px-6 py-4"
                                    >
                                        <Text className="text-center font-semibold text-white">
                                            Create New Account
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Terms */}
                                <View className="mt-6">
                                    <Text className="text-center text-xs text-white/60">
                                        By continuing, you agree to our{' '}
                                        <Text className="text-white/80">Terms of Service</Text>
                                        {' '}and{' '}
                                        <Text className="text-white/80">Privacy Policy</Text>
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
};

export default LoginScreen;