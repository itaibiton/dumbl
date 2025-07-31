import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Exercise set type for validation
const exerciseSetValidator = v.object({
  reps: v.number(),
  weight: v.optional(v.number()),
  duration: v.optional(v.number()),
  distance: v.optional(v.number()),
  restTime: v.optional(v.number()),
});

// Exercise type for validation
const exerciseValidator = v.object({
  name: v.string(),
  sets: v.array(exerciseSetValidator),
  notes: v.optional(v.string()),
});

// Mutation to create a new workout
export const createWorkout = mutation({
  args: {
    name: v.string(),
    exercises: v.array(exerciseValidator),
    duration: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // Get the current authenticated user
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        throw new ConvexError("User not authenticated");
      }

      const clerkId = identity.subject;
      
      // Find the user in our database
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user) {
        throw new ConvexError("User not found. Please ensure you are properly signed up.");
      }

      // Validate exercises array is not empty
      if (args.exercises.length === 0) {
        throw new ConvexError("Workout must contain at least one exercise");
      }

      // Validate workout name is not empty
      if (!args.name.trim()) {
        throw new ConvexError("Workout name cannot be empty");
      }

      const now = Date.now();

      // Create the workout
      const workoutId = await ctx.db.insert("workouts", {
        userId: user._id,
        name: args.name.trim(),
        exercises: args.exercises,
        duration: args.duration,
        notes: args.notes,
        createdAt: now,
      });

      return workoutId;
    } catch (error) {
      console.error("Error creating workout:", error);
      if (error instanceof ConvexError) {
        throw error;
      }
      throw new ConvexError("Failed to create workout");
    }
  },
});

// Query to get all workouts for the current user
export const getUserWorkouts = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        return [];
      }

      const clerkId = identity.subject;
      
      // Find the user in our database
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user) {
        return [];
      }

      // Get user's workouts, ordered by creation date (newest first)
      let query = ctx.db
        .query("workouts")
        .withIndex("by_user_created", (q) => q.eq("userId", user._id))
        .order("desc");

      if (args.limit) {
        query = query.take(args.limit);
      }

      const workouts = await query.collect();
      return workouts;
    } catch (error) {
      console.error("Error fetching user workouts:", error);
      throw new ConvexError("Failed to fetch workouts");
    }
  },
});

// Query to get a specific workout by ID
export const getWorkoutById = query({
  args: { workoutId: v.id("workouts") },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        throw new ConvexError("User not authenticated");
      }

      const workout = await ctx.db.get(args.workoutId);
      
      if (!workout) {
        throw new ConvexError("Workout not found");
      }

      // Verify the workout belongs to the current user
      const clerkId = identity.subject;
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user || workout.userId !== user._id) {
        throw new ConvexError("Unauthorized access to workout");
      }

      return workout;
    } catch (error) {
      console.error("Error fetching workout:", error);
      if (error instanceof ConvexError) {
        throw error;
      }
      throw new ConvexError("Failed to fetch workout");
    }
  },
});

// Mutation to update a workout
export const updateWorkout = mutation({
  args: {
    workoutId: v.id("workouts"),
    name: v.optional(v.string()),
    exercises: v.optional(v.array(exerciseValidator)),
    duration: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        throw new ConvexError("User not authenticated");
      }

      const workout = await ctx.db.get(args.workoutId);
      
      if (!workout) {
        throw new ConvexError("Workout not found");
      }

      // Verify the workout belongs to the current user
      const clerkId = identity.subject;
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user || workout.userId !== user._id) {
        throw new ConvexError("Unauthorized access to workout");
      }

      // Prepare update object
      const updateData: any = {
        updatedAt: Date.now(),
      };

      if (args.name !== undefined) {
        if (!args.name.trim()) {
          throw new ConvexError("Workout name cannot be empty");
        }
        updateData.name = args.name.trim();
      }

      if (args.exercises !== undefined) {
        if (args.exercises.length === 0) {
          throw new ConvexError("Workout must contain at least one exercise");
        }
        updateData.exercises = args.exercises;
      }

      if (args.duration !== undefined) {
        updateData.duration = args.duration;
      }

      if (args.notes !== undefined) {
        updateData.notes = args.notes;
      }

      await ctx.db.patch(args.workoutId, updateData);
      
      return args.workoutId;
    } catch (error) {
      console.error("Error updating workout:", error);
      if (error instanceof ConvexError) {
        throw error;
      }
      throw new ConvexError("Failed to update workout");
    }
  },
});

// Mutation to delete a workout
export const deleteWorkout = mutation({
  args: { workoutId: v.id("workouts") },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        throw new ConvexError("User not authenticated");
      }

      const workout = await ctx.db.get(args.workoutId);
      
      if (!workout) {
        throw new ConvexError("Workout not found");
      }

      // Verify the workout belongs to the current user
      const clerkId = identity.subject;
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user || workout.userId !== user._id) {
        throw new ConvexError("Unauthorized access to workout");
      }

      await ctx.db.delete(args.workoutId);
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting workout:", error);
      if (error instanceof ConvexError) {
        throw error;
      }
      throw new ConvexError("Failed to delete workout");
    }
  },
});

// Query to get workout statistics for the current user
export const getWorkoutStats = query({
  args: {},
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        return null;
      }

      const clerkId = identity.subject;
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user) {
        return null;
      }

      const workouts = await ctx.db
        .query("workouts")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      const totalWorkouts = workouts.length;
      const totalExercises = workouts.reduce(
        (sum, workout) => sum + workout.exercises.length, 
        0
      );
      
      const totalDuration = workouts.reduce(
        (sum, workout) => sum + (workout.duration || 0), 
        0
      );

      // Get workouts from the last 30 days
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const recentWorkouts = workouts.filter(
        workout => workout.createdAt > thirtyDaysAgo
      );

      return {
        totalWorkouts,
        totalExercises,
        totalDuration,
        recentWorkouts: recentWorkouts.length,
        averageWorkoutDuration: totalWorkouts > 0 ? totalDuration / totalWorkouts : 0,
      };
    } catch (error) {
      console.error("Error fetching workout stats:", error);
      throw new ConvexError("Failed to fetch workout statistics");
    }
  },
});