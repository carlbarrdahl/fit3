import { useCallback, useReducer, useRef } from "react";
import dynamic from "next/dynamic";
import { useWorkout } from "../store";
import { activityModes, Workout, WorkoutActivity } from "../schemas";

import { Activity } from "activities";
import { CheckPoseArgs } from "utils/pose";
import { useDuration } from "../hooks/useDuration";

const PoseEstimation = dynamic(() => import("components/PoseEstimation"), {
  ssr: false,
});

let lastUpdate = 0;

const SAMPLING_RATE = 500;

type Props = {
  activities: Record<string, (args: Activity) => void>;
  workout: Workout;
};

export const ActivityDetection = ({ activities, workout }: Props) => {
  const state = useRef({ count: 0, mode: null, startedAt: 0 });
  const { startedAt, currentActivity, tick } = useWorkout();

  const [proof, pushProof] = useReducer(
    (prev: any[], next: {}) => prev.concat(next),
    []
  );

  console.log("startedAt", startedAt);

  const handleDetect = useCallback(
    (args: CheckPoseArgs) => {
      const activity = workout.activities[currentActivity] as WorkoutActivity;
      if (activity) {
        const type = activity.type;

        state.current.startedAt = startedAt;
        activities[type]?.({
          ...args,
          state: state.current,
          onCount: () => tick(workout),
        });

        // Record args.parts and store in WorkoutResults

        // const now = Date.now();
        // if (now - lastUpdate > SAMPLING_RATE) {
        //   const parts = Object.entries(args.parts)
        //     // Only visible parts
        //     .filter(([key, part]) => part?.visibility && part.visibility > 0.5)
        //     .reduce(
        //       (acc, [key, part]) => ({
        //         ...acc,
        //         timestamp: Date.now(),
        //         parts: {
        //           ...acc.parts,
        //           [key]: part,
        //         },
        //       }),
        //       { parts: {} }
        //     );
        //   lastUpdate = Date.now();
        //   // pushProof(parts);
        //   console.log(parts);
        // }
      }
    },
    [currentActivity, startedAt]
  );

  return <PoseEstimation detect={handleDetect} />;
};
