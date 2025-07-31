import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
    const { signUp, setActive, isLoaded } = useSignUp();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Create your account</Text>

                <View style={styles.buttonContainer}>
                    <View style={styles.emailFormContainer}>
                        {!pendingVerification ? (
                            <>
                                <Text style={styles.emailFormTitle}>Enter your details to get started</Text>

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
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        editable={!isLoading}
                                    />
                                </View>

                                <TouchableOpacity 
                                    style={[styles.emailButton, isLoading && styles.emailButtonDisabled]} 
                                    onPress={handleRegister}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.emailButtonText}>
                                        {isLoading ? 'Creating account...' : 'Create Account'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={navigateToSignIn}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.switchModeText}>
                                        Already have an account? Sign In
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={styles.emailFormTitle}>
                                    Enter the verification code sent to {email}
                                </Text>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Verification code"
                                        value={verificationCode}
                                        onChangeText={setVerificationCode}
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        editable={!isLoading}
                                    />
                                </View>

                                <TouchableOpacity 
                                    style={[styles.emailButton, isLoading && styles.emailButtonDisabled]} 
                                    onPress={handleVerifyEmail}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.emailButtonText}>
                                        {isLoading ? 'Verifying...' : 'Verify Email'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => setPendingVerification(false)}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.switchModeText}>
                                        ← Back to email
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
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

export default RegisterScreen;