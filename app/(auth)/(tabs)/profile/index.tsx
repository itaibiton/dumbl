import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useUserSync } from '@/hooks/useUserSync';
import { SignOutButton } from '@/components/SignOutButton';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  StatCard,
  ThemeToggle,
  Badge,
  Separator,
  Button,
  ButtonText
} from '@/components/ui';

const ProfilePage = () => {
    const { user: clerkUser } = useUser();
    
    // Get user sync data
    const { convexUser, syncStatus, lastSyncError, syncRetries, isLoading } = useUserSync();

    const getSyncStatusBadge = () => {
        switch (syncStatus) {
            case 'loading':
                return <Badge variant="warning">Loading...</Badge>;
            case 'synced':
                return <Badge variant="success">Synced</Badge>;
            case 'error':
                return <Badge variant="destructive">Error</Badge>;
            default:
                return <Badge variant="outline">Not Synced</Badge>;
        }
    };

    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-6 space-y-6">
                {/* Header */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-foreground">Profile</Text>
                    <ThemeToggle variant="icon" />
                </View>

                <Separator />

                {/* User Stats */}
                <View className="flex-row space-x-4">
                    <StatCard
                        title="Workouts"
                        value={47}
                        description="Total completed"
                        variant="success"
                        size="sm"
                        className="flex-1"
                    />
                    <StatCard
                        title="Streak"
                        value={12}
                        unit="days"
                        description="Current streak"
                        variant="warning"
                        size="sm"
                        className="flex-1"
                    />
                </View>

                {/* User Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Sync Status */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-sm font-medium text-foreground">
                                Sync Status
                            </Text>
                            <View className="flex-row items-center space-x-2">
                                {getSyncStatusBadge()}
                                {syncStatus === 'loading' && (
                                    <ActivityIndicator size="small" />
                                )}
                            </View>
                        </View>

                        {/* Show sync error if present */}
                        {lastSyncError && (
                            <View className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                                <Text className="text-sm font-medium text-destructive">
                                    Sync Error: {lastSyncError}
                                </Text>
                                {syncRetries > 0 && (
                                    <Text className="text-xs text-muted-foreground mt-1">
                                        Retried {syncRetries} time(s)
                                    </Text>
                                )}
                            </View>
                        )}

                        <Separator />

                        {/* User Details */}
                        {(convexUser || clerkUser) && (
                            <View className="space-y-3">
                                <View>
                                    <Text className="text-sm font-medium text-muted-foreground">
                                        Email
                                    </Text>
                                    <Text className="text-base text-foreground">
                                        {convexUser?.email || clerkUser?.emailAddresses[0]?.emailAddress}
                                    </Text>
                                </View>
                                
                                {(convexUser?.name || clerkUser?.fullName) && (
                                    <View>
                                        <Text className="text-sm font-medium text-muted-foreground">
                                            Name
                                        </Text>
                                        <Text className="text-base text-foreground">
                                            {convexUser?.name || clerkUser?.fullName}
                                        </Text>
                                    </View>
                                )}
                                
                                <View>
                                    <Text className="text-sm font-medium text-muted-foreground">
                                        User ID
                                    </Text>
                                    <Text className="text-sm font-mono text-muted-foreground">
                                        {convexUser?._id || 'Not synced yet'}
                                    </Text>
                                </View>
                                
                                {convexUser && (
                                    <View>
                                        <Text className="text-sm font-medium text-muted-foreground">
                                            Last Updated
                                        </Text>
                                        <Text className="text-sm text-muted-foreground">
                                            {new Date(convexUser.updatedAt).toLocaleString()}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </CardContent>
                </Card>

                {/* Theme Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ThemeToggle />
                    </CardContent>
                </Card>

                {/* App Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full">
                            <ButtonText variant="outline">Notification Settings</ButtonText>
                        </Button>
                        
                        <Button variant="outline" className="w-full">
                            <ButtonText variant="outline">Privacy & Security</ButtonText>
                        </Button>
                        
                        <Button variant="outline" className="w-full">
                            <ButtonText variant="outline">Data & Storage</ButtonText>
                        </Button>
                    </CardContent>
                </Card>

                {/* Sign Out */}
                <View className="pt-4">
                    <SignOutButton />
                </View>

                <View className="pb-8" />
            </View>
        </ScrollView>
    );
};

export default ProfilePage;