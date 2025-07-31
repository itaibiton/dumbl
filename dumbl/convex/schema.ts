import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),

  workouts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    exercises: v.array(
      v.object({
        name: v.string(),
        sets: v.array(
          v.object({
            reps: v.number(),
            weight: v.optional(v.number()),
            duration: v.optional(v.number()), // for time-based exercises
            distance: v.optional(v.number()), // for cardio exercises
            restTime: v.optional(v.number()), // rest time in seconds
          })
        ),
        notes: v.optional(v.string()),
      })
    ),
    duration: v.optional(v.number()), // total workout duration in minutes
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_created", ["userId", "createdAt"])
    .index("by_created_at", ["createdAt"]),
});