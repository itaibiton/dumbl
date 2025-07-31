import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Sign in to your account</Text>

                <View style={styles.buttonContainer}>
                    <View style={styles.emailFormContainer}>
                        <Text style={styles.emailFormTitle}>Enter your credentials to sign in</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isLoading}
                            />
                            <TextInput
                                style={styles.input}
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
                            style={[styles.emailButton, isLoading && styles.emailButtonDisabled]} 
                            onPress={handleEmailSignIn}
                            disabled={isLoading}
                        >
                            <Text style={styles.emailButtonText}>
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={navigateToRegister} 
                            disabled={isLoading}
                        >
                            <Text style={styles.switchModeText}>
                                Don't have an account? Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
        paddingTop: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        gap: 20,
        marginHorizontal: 20,
        width: '100%',
        maxWidth: 400,
    },
    emailFormContainer: {
        width: '100%',
        gap: 20,
    },
    emailFormTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#666',
    },
    inputContainer: {
        gap: 15,
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        fontSize: 16,
    },
    emailButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    emailButtonDisabled: {
        backgroundColor: '#666',
    },
    emailButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    switchModeText: {
        fontSize: 14,
        color: '#007AFF',
        textAlign: 'center',
    },
});

export default LoginScreen;