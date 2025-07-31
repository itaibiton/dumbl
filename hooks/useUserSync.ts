import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserSyncStatus } from '@/types/user';

interface UseUserSyncReturn {
  convexUser: any;
  syncStatus: UserSyncStatus;
  lastSyncError: string | null;
  syncRetries: number;
  isLoading: boolean;
}

export const useUserSync = (): UseUserSyncReturn => {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const convexUser = useQuery(api.users.getCurrentUser);
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);
  
  const syncedRef = useRef<string | null>(null);
  const [syncRetries, setSyncRetries] = useState(0);
  const [lastSyncError, setLastSyncError] = useState<string | null>(null);
  
  const MAX_SYNC_RETRIES = 3;
  
  // Determine sync status
  const isLoading = convexUser === undefined && isClerkLoaded && clerkUser;
  const syncStatus: UserSyncStatus = 
    lastSyncError && syncRetries >= MAX_SYNC_RETRIES ? 'not_synced' :
    convexUser ? 'synced' : 
    isLoading ? 'loading' : 'not_synced';

  useEffect(() => {
    const syncUser = async () => {
      if (!clerkUser?.id || !isClerkLoaded) return;
      
      // Avoid duplicate sync calls for the same user (unless we need to retry)
      if (syncedRef.current === clerkUser.id && syncRetries === 0) return;
      
      // Don't retry if we've exceeded max retries
      if (syncRetries >= MAX_SYNC_RETRIES) {
        console.error(`Max sync retries (${MAX_SYNC_RETRIES}) exceeded for user ${clerkUser.id}`);
        return;
      }
      
      try {
        const primaryEmail = clerkUser.emailAddresses.find(
          email => email.id === clerkUser.primaryEmailAddressId
        );
        const email = primaryEmail?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;
        
        if (!email) {
          const error = 'No email found for user';
          console.error(error);
          setLastSyncError(error);
          return;
        }

        const name = clerkUser.fullName || clerkUser.firstName || undefined;

        await createOrUpdateUser({
          clerkId: clerkUser.id,
          email: email,
          name: name,
        });

        // Mark this user as synced and reset error states
        syncedRef.current = clerkUser.id;
        setSyncRetries(0);
        setLastSyncError(null);
        console.log('User synced with Convex successfully');
      } catch (error) {
        console.error('Failed to sync user with Convex:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown sync error';
        setLastSyncError(errorMessage);
        
        // Increment retry count and try again after a delay
        setTimeout(() => {
          setSyncRetries(prev => prev + 1);
        }, 2000 * (syncRetries + 1)); // Exponential backoff: 2s, 4s, 6s
      }
    };

    syncUser();
  }, [clerkUser?.id, isClerkLoaded, createOrUpdateUser, syncRetries]);

  // Reset sync status when user changes or signs out
  useEffect(() => {
    if (!clerkUser) {
      syncedRef.current = null;
      setSyncRetries(0);
      setLastSyncError(null);
    }
  }, [clerkUser?.id]);

  return {
    convexUser,
    syncStatus,
    lastSyncError,
    syncRetries,
    isLoading,
  };
};