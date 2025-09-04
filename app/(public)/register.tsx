import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
    const { signUp, setActive, isLoaded } = useSignUp();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async () => {
        if (!isLoaded || isLoading) return;

        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (!password) {
            Alert.alert('Error', 'Please enter a password');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            // Create the sign up with email and password
            await signUp.create({
                emailAddress: email,
                password: password,
            });

            // Send the email verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            
            setPendingVerification(true);
            Alert.alert('Success', 'Verification code sent to your email!');
        } catch (err: any) {
            console.error('Sign up error', err);
            Alert.alert('Error', err.errors?.[0]?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyEmail = async () => {
        if (!isLoaded || isLoading) return;

        if (!verificationCode.trim()) {
            Alert.alert('Error', 'Please enter the verification code');
            return;
        }

        setIsLoading(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                // Router will handle navigation based on auth state
            } else if (completeSignUp.status === 'missing_requirements') {
                console.error('Missing requirements', completeSignUp);
                Alert.alert('Error', 'Please complete all required fields');
            } else {
                console.error('Verification failed', completeSignUp);
                Alert.alert('Error', 'Verification failed. Please try again.');
            }
        } catch (err: any) {
            console.error('Verification error', err);
            Alert.alert('Error', err.errors?.[0]?.message || 'Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToSignIn = () => {
        router.push('/(public)/');
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#8b5cf6', '#ec4899']}
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
                                <View className="mb-8 items-center">
                                    <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-white/20">
                                        <Ionicons name="fitness" size={40} color="white" />
                                    </View>
                                    <Text className="text-4xl font-bold text-white">Join Dumbl</Text>
                                    <Text className="mt-2 text-white/80">Start Your Fitness Transformation</Text>
                                </View>

                                {/* Registration Form */}
                                <View className="rounded-3xl bg-white/10 p-6 backdrop-blur-lg">
                                    {!pendingVerification ? (
                                        <>
                                            <Text className="mb-6 text-center text-2xl font-bold text-white">Create Account</Text>
                                            
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
                                            <View className="mb-4">
                                                <View className="flex-row items-center rounded-xl bg-white/20 px-4">
                                                    <Ionicons name="lock-closed-outline" size={20} color="white" />
                                                    <TextInput
                                                        className="flex-1 py-4 pl-3 text-white"
                                                        placeholder="Password (min 8 characters)"
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
                                            
                                            {/* Confirm Password Input */}
                                            <View className="mb-6">
                                                <View className="flex-row items-center rounded-xl bg-white/20 px-4">
                                                    <Ionicons name="lock-closed-outline" size={20} color="white" />
                                                    <TextInput
                                                        className="flex-1 py-4 pl-3 text-white"
                                                        placeholder="Confirm password"
                                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                                        value={confirmPassword}
                                                        onChangeText={setConfirmPassword}
                                                        secureTextEntry={!showConfirmPassword}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        editable={!isLoading}
                                                    />
                                                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        <Ionicons 
                                                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                                                            size={20} 
                                                            color="white" 
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            
                                            {/* Sign Up Button */}
                                            <TouchableOpacity 
                                                onPress={handleRegister}
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
                                                            Create Account
                                                        </Text>
                                                    )}
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            
                                            {/* Divider */}
                                            <View className="my-4 flex-row items-center">
                                                <View className="h-px flex-1 bg-white/20" />
                                                <Text className="mx-4 text-white/60">OR</Text>
                                                <View className="h-px flex-1 bg-white/20" />
                                            </View>
                                            
                                            {/* Sign In Link */}
                                            <TouchableOpacity 
                                                onPress={navigateToSignIn}
                                                disabled={isLoading}
                                                className="rounded-xl border border-white/30 px-6 py-4"
                                            >
                                                <Text className="text-center font-semibold text-white">
                                                    Already have an account? Sign In
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            {/* Verification Code Section */}
                                            <Text className="mb-2 text-center text-2xl font-bold text-white">
                                                Verify Your Email
                                            </Text>
                                            <Text className="mb-6 text-center text-sm text-white/80">
                                                We've sent a code to {email}
                                            </Text>
                                            
                                            {/* Verification Code Input */}
                                            <View className="mb-6">
                                                <View className="flex-row items-center rounded-xl bg-white/20 px-4">
                                                    <Ionicons name="key-outline" size={20} color="white" />
                                                    <TextInput
                                                        className="flex-1 py-4 pl-3 text-center text-white"
                                                        placeholder="Enter 6-digit code"
                                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                                        value={verificationCode}
                                                        onChangeText={setVerificationCode}
                                                        keyboardType="number-pad"
                                                        maxLength={6}
                                                        autoCapitalize="none"
                                                        autoCorrect={false}
                                                        editable={!isLoading}
                                                    />
                                                </View>
                                            </View>
                                            
                                            {/* Verify Button */}
                                            <TouchableOpacity 
                                                onPress={handleVerifyEmail}
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
                                                            Verify Email
                                                        </Text>
                                                    )}
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            
                                            {/* Back to Email */}
                                            <TouchableOpacity 
                                                onPress={() => setPendingVerification(false)}
                                                disabled={isLoading}
                                                className="flex-row items-center justify-center"
                                            >
                                                <Ionicons name="arrow-back" size={20} color="white" />
                                                <Text className="ml-2 text-white/80">Back to registration</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>

                                {/* Terms */}
                                {!pendingVerification && (
                                    <View className="mt-6">
                                        <Text className="text-center text-xs text-white/60">
                                            By creating an account, you agree to our{' '}
                                            <Text className="text-white/80">Terms of Service</Text>
                                            {' '}and{' '}
                                            <Text className="text-white/80">Privacy Policy</Text>
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
};

export default RegisterScreen;