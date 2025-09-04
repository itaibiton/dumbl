import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useUserSync } from '@/hooks/useUserSync';
import { SignOutButton } from '@/components/SignOutButton';

const ProfilePage = () => {
    const { user: clerkUser } = useUser();
    
    // Get user sync data
    const { convexUser, syncStatus, lastSyncError, syncRetries, isLoading } = useUserSync();

    const getSyncStatusText = () => {
        switch (syncStatus) {
            case 'loading':
                return 'Loading...';
            case 'synced':
                return 'Synced';
            case 'error':
                return 'Error';
            default:
                return 'Not Synced';
        }
    };

    return (
        <ScrollView>
            <View>
                <Text>Profile</Text>

                {/* Sync Status */}
                <View>
                    <Text>Sync Status: {getSyncStatusText()}</Text>
                    {syncStatus === 'loading' && <ActivityIndicator size="small" />}
                </View>

                {/* Show sync error if present */}
                {lastSyncError && (
                    <View>
                        <Text>Sync Error: {lastSyncError}</Text>
                        {syncRetries > 0 && (
                            <Text>Retried {syncRetries} time(s)</Text>
                        )}
                    </View>
                )}

                {/* User Details */}
                {(convexUser || clerkUser) && (
                    <View>
                        <View>
                            <Text>Email</Text>
                            <Text>
                                {convexUser?.email || clerkUser?.emailAddresses[0]?.emailAddress}
                            </Text>
                        </View>
                        
                        {(convexUser?.name || clerkUser?.fullName) && (
                            <View>
                                <Text>Name</Text>
                                <Text>{convexUser?.name || clerkUser?.fullName}</Text>
                            </View>
                        )}
                        
                        <View>
                            <Text>User ID</Text>
                            <Text>{convexUser?._id || 'Not synced yet'}</Text>
                        </View>
                        
                        {convexUser && (
                            <View>
                                <Text>Last Updated</Text>
                                <Text>{new Date(convexUser.updatedAt).toLocaleString()}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Sign Out */}
                <View>
                    <SignOutButton />
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfilePage;