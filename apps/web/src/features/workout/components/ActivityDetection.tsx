import { useCallback, useReducer, useRef } from "react";
import dynamic from "next/dynamic";
import { CheckPoseArgs } from "components/PoseEstimation";
import { useWorkout } from "../store";
import { Workout, WorkoutActivity } from "../schemas";
import { Button } from "components/Button";

import squatActivity from "activities/squat";
import pushupActivity from "activities/push_up";
import plankActivity from "activities/plank";
import { Activity } from "activities";

const PoseEstimation = dynamic(() => import("components/PoseEstimation"), {
  ssr: false,
});

let lastUpdate = 0;

const SAMPLING_RATE = 500;
export const ActivityDetection = ({
  activities,
  workout,
}: {
  activities: Record<string, (args: Activity) => void>;
  workout: Workout;
}) => {
  const state = useRef({ count: 0, mode: null });
  const { currentActivity, incCount } = useWorkout();

  const [proof, pushProof] = useReducer(
    (prev: any[], next: {}) => prev.concat(next),
    []
  );

  const handleDetect = useCallback(
    (args: CheckPoseArgs) => {
      const activity = workout.activities[currentActivity] as WorkoutActivity;
      if (activity) {
        const type = activity.type;
        activities[type]?.({
          ...args,
          state: state.current,
          onCount: (c) => incCount(workout),
        });

        // Record args.parts and store in WorkoutResults

        const now = Date.now();
        if (now - lastUpdate > SAMPLING_RATE) {
          const parts = Object.entries(args.parts)
            // Only visible parts
            .filter(([key, part]) => part?.visibility && part.visibility > 0.5)
            .reduce(
              (acc, [key, part]) => ({
                ...acc,
                timestamp: Date.now(),
                parts: {
                  ...acc.parts,
                  [key]: part,
                },
              }),
              { parts: {} }
            );
          lastUpdate = Date.now();
          // pushProof(parts);
          console.log(parts);
        }
      }
    },
    [currentActivity]
  );

  return (
    <div>
      <Button
        className="mb-2 w-full"
        onClick={() => {
          console.log("Start");
        }}
      >
        Start workout
      </Button>
      <PoseEstimation detect={handleDetect} />
    </div>
  );
};
