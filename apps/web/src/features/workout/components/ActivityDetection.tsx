import { useCallback, useReducer, useRef } from "react";
import dynamic from "next/dynamic";
import { useWorkout } from "../store";
import { Workout, WorkoutActivity } from "../schemas";

import { Activities } from "activities";
import { CheckPoseArgs } from "utils/pose";

const PoseEstimation = dynamic(() => import("components/PoseEstimation"), {
  ssr: false,
});

let lastUpdate = 0;

const SAMPLING_RATE = 200;

type Props = {
  activities: Activities;
  workout: Workout;
};

export const ActivityDetection = ({ activities, workout }: Props) => {
  const state = useRef({ count: 0, mode: null, startedAt: 0 });

  // const {  } = useClock();
  const { startedAt, currentActivity, tick } = useWorkout();

  // TODO: Move to store
  const [proof, pushProof] = useReducer(
    (prev: any[], next: {}) => prev.concat(next),
    []
  );

  const handleDetect = useCallback(
    (args: CheckPoseArgs) => {
      const activity = workout.activities[currentActivity] as WorkoutActivity;
      if (activity) {
        const type = activity.type as keyof typeof activities;

        state.current.startedAt = startedAt;
        activities[type]?.func?.({
          ...args,
          state: state.current,
          onCount: () => tick(workout),
        });

        // Record args.parts and store in WorkoutResults
        // Move to store
        if (state.current.startedAt) {
          const now = Date.now();
          if (now - lastUpdate > SAMPLING_RATE) {
            const parts = Object.entries(args.body)
              // Only visible parts
              .filter(
                ([key, part]) => part?.visibility && part.visibility > 0.5
              )
              .reduce(
                (acc, [key, part]) => ({
                  ...acc,
                  timestamp: Date.now(),
                  body: { ...acc.body, [key]: part },
                }),
                { body: {} }
              );
            lastUpdate = Date.now();
            // pushProof(parts);
            // console.log(parts);
          }
        }
      }
    },
    [currentActivity, startedAt]
  );

  return <PoseEstimation detect={handleDetect} />;
};
