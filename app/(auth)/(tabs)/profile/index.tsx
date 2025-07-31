import { StyleSheet, View, Text } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '@/components/SignOutButton';

const ProfilePage = () => {
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {user && (
                <Text style={styles.email}>{user.emailAddresses[0]?.emailAddress}</Text>
            )}
            <View style={styles.signOutContainer}>
                <SignOutButton />
            </View>
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    signOutContainer: {
        marginTop: 20,
    },
});