import { z } from "zod";

const WorkoutActivitySchema = z.object({ count: z.number(), type: z.string() });
const WorkoutSchema = z.object({
  type: z.string(),
  duration: z.number(),
  activities: z.array(WorkoutActivitySchema),
});

const WorkoutResultsSchema = z.object({
  timestamp: z.number(),
  proof: z.array(
    z.object({
      timestamp: z.number(),
      parts: z.record(
        z.object({
          x: z.number(),
          y: z.number(),
          z: z.number(),
          visibility: z.number(),
        })
      ),
    })
  ),
});

export type Workout = z.infer<typeof WorkoutSchema>;
export type WorkoutActivity = z.infer<typeof WorkoutActivitySchema>;
export type WorkoutResults = z.infer<typeof WorkoutResultsSchema>;
