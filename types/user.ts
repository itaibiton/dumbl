import { Doc } from '@/convex/_generated/dataModel';

// Convex user type
export type ConvexUser = Doc<'users'>;

// User sync status type
export type UserSyncStatus = 'loading' | 'synced' | 'not_synced';

// User data for creating/updating
export interface UserData {
  clerkId: string;
  email: string;
  name?: string;
}

// Combined user data from both Clerk and Convex
export interface UserProfile {
  convexUser: ConvexUser | null | undefined;
  clerkUser: any; // Clerk user type
  syncStatus: UserSyncStatus;
  primaryEmail?: string;
  displayName?: string;
}