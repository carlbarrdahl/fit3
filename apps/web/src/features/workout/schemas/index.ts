import { z } from "zod";

const WorkoutActivitySchema = z.object({ count: z.number(), type: z.string() });
const WorkoutSchema = z.object({
  type: z.string(),
  duration: z.number(),
  activities: z.array(WorkoutActivitySchema),
});

const WorkoutResultsSchema = z.object({
  //
});

export type Workout = z.infer<typeof WorkoutSchema>;
export type WorkoutActivity = z.infer<typeof WorkoutActivitySchema>;
export type WorkoutResults = z.infer<typeof WorkoutResultsSchema>;
