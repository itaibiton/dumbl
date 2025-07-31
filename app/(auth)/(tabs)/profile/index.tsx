import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useUserSync } from '@/hooks/useUserSync';
import { SignOutButton } from '@/components/SignOutButton';

const ProfilePage = () => {
    const { user: clerkUser } = useUser();
    
    // Get user sync data
    const { convexUser, syncStatus, lastSyncError, syncRetries, isLoading } = useUserSync();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            
            {/* Connection Status Indicator */}
            <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Sync Status:</Text>
                <View style={[styles.statusIndicator, styles[`status_${syncStatus}`]]}>
                    <Text style={styles.statusText}>
                        {syncStatus === 'loading' ? 'Loading...' : 
                         syncStatus === 'synced' ? 'Synced' : 'Not Synced'}
                    </Text>
                    {syncStatus === 'loading' && (
                        <ActivityIndicator size="small" color="#666" style={styles.loader} />
                    )}
                </View>
            </View>

            {/* Show sync error if present */}
            {lastSyncError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        Sync Error: {lastSyncError}
                    </Text>
                    {syncRetries > 0 && (
                        <Text style={styles.retryText}>
                            Retried {syncRetries} time(s)
                        </Text>
                    )}
                </View>
            )}

            {/* User Information - prioritize Convex data */}
            {(convexUser || clerkUser) && (
                <View style={styles.userInfo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.email}>
                        {convexUser?.email || clerkUser?.emailAddresses[0]?.emailAddress}
                    </Text>
                    
                    {(convexUser?.name || clerkUser?.fullName) && (
                        <>
                            <Text style={styles.label}>Name:</Text>
                            <Text style={styles.name}>
                                {convexUser?.name || clerkUser?.fullName}
                            </Text>
                        </>
                    )}
                    
                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.userId}>
                        {convexUser?._id || 'Not synced yet'}
                    </Text>
                    
                    {convexUser && (
                        <>
                            <Text style={styles.label}>Last Updated:</Text>
                            <Text style={styles.timestamp}>
                                {new Date(convexUser.updatedAt).toLocaleString()}
                            </Text>
                        </>
                    )}
                </View>
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
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    statusLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
        color: '#333',
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    status_loading: {
        backgroundColor: '#ffeaa7',
    },
    status_synced: {
        backgroundColor: '#00b894',
    },
    status_not_synced: {
        backgroundColor: '#e17055',
    },
    status_error: {
        backgroundColor: '#d63031',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
    loader: {
        marginLeft: 4,
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#e53e3e',
    },
    errorText: {
        fontSize: 14,
        color: '#e53e3e',
        fontWeight: '500',
    },
    retryText: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    userInfo: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        marginTop: 12,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    userId: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'monospace',
        marginBottom: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    signOutContainer: {
        marginTop: 20,
    },
});