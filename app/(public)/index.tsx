import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';

const LoginScreen = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState('');

    const handleEmailSignIn = async () => {
        if (!isLoaded) return;

        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: email,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
            } else {
                console.error('Sign in failed', signInAttempt);
                Alert.alert('Error', 'Sign in failed. Please check your email.');
            }
        } catch (err: any) {
            console.error('Sign in error', err);
            Alert.alert('Error', err.errors?.[0]?.message || 'Sign in failed');
        }
    };

    //   const triggerError = () => {
    //     try {
    //       throw new Error('This is a test error');
    //     } catch (error) {
    //       const sentryId = Sentry.captureMessage('Houston, we have a problem');

    //       const userFeedback: UserFeedback = {
    //         event_id: sentryId,
    //         name: 'Simon Grimm',
    //         email: 'simon@galaxies.dev',
    //         comments: 'Enrich the error message with more information',
    //       };

    //       Sentry.captureUserFeedback(userFeedback);
    //     }
    //   };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Sign in to your account</Text>

                <View style={styles.buttonContainer}>
                    <View style={styles.emailFormContainer}>
                        <Text style={styles.emailFormTitle}>Enter your email to sign in</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <TouchableOpacity style={styles.emailButton} onPress={handleEmailSignIn}>
                            <Text style={styles.emailButtonText}>Sign In</Text>
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
    emailButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default LoginScreen;