import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        <View>
            <ScrollView>
                <Text>Sign in to your account</Text>

                <View>
                    <View>
                        <Text>Enter your credentials to sign in</Text>

                        <View>
                            <TextInput
                                placeholder="Email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isLoading}
                            />
                            <TextInput
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isLoading}
                            />
                        </View>

                        <TouchableOpacity 
                            onPress={handleEmailSignIn}
                            disabled={isLoading}
                        >
                            <Text>
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={navigateToRegister} 
                            disabled={isLoading}
                        >
                            <Text>
                                Don't have an account? Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;