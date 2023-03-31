import { z } from "zod";

export const activityModes = { repeat: "repeat", time: "time" } as const;
export const workoutTypes = { amrap: "amrap", emom: "emom" } as const;
export const activityTypes = { squat: "squat", push_up: "push_up" } as const;

const WorkoutActivitySchema = z.object({
  count: z.number(),
  type: z.string(),
  mode: z.nativeEnum(activityModes),
});

const WorkoutSchema = z.object({
  type: z.nativeEnum(workoutTypes),
  duration: z.number(),
  activities: z.array(WorkoutActivitySchema),
});

// Look at CrossFit Open results for inspiration
const WorkoutResultsSchema = z.object({
  timestamp: z.number(),
  results: z.array(
    z.object({
      type: z.nativeEnum(activityTypes),
      count: z.number(),
    })
  ),
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
