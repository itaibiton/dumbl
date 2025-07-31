import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Mutation to create or update a user when they sign up/sign in with Clerk
export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user already exists
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .unique();

      const now = Date.now();

      if (existingUser) {
        // Update existing user
        await ctx.db.patch(existingUser._id, {
          email: args.email,
          name: args.name,
          updatedAt: now,
        });
        return existingUser._id;
      } else {
        // Create new user
        const userId = await ctx.db.insert("users", {
          clerkId: args.clerkId,
          email: args.email,
          name: args.name,
          createdAt: now,
          updatedAt: now,
        });
        return userId;
      }
    } catch (error) {
      console.error("Error creating/updating user:", error);
      throw new ConvexError("Failed to create or update user");
    }
  },
});

// Query to get a user by their Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .unique();

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error fetching user by Clerk ID:", error);
      throw new ConvexError("Failed to fetch user");
    }
  },
});

// Query to get the current authenticated user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    try {
      // Get the current user's identity from Convex auth
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        return null;
      }

      // Extract Clerk user ID from the identity
      const clerkId = identity.subject;

      if (!clerkId) {
        return null;
      }

      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      return user;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw new ConvexError("Failed to fetch current user");
    }
  },
});

// Query to get user by ID
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db.get(args.userId);
      
      if (!user) {
        throw new ConvexError("User not found");
      }

      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new ConvexError("Failed to fetch user");
    }
  },
});

// Mutation to update user profile
export const updateUserProfile = mutation({
  args: {
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        throw new ConvexError("User not authenticated");
      }

      const clerkId = identity.subject;
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user) {
        throw new ConvexError("User not found");
      }

      await ctx.db.patch(user._id, {
        name: args.name,
        updatedAt: Date.now(),
      });

      return user._id;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new ConvexError("Failed to update user profile");
    }
  },
});