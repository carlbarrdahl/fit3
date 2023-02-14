import { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { CheckPoseArgs } from "components/PoseEstimation";
import { useWorkout } from "../store";
import { Workout, WorkoutActivity } from "../schemas";
import { Button } from "components/Button";

const PoseEstimation = dynamic(() => import("components/PoseEstimation"), {
  ssr: false,
});

type Detection = CheckPoseArgs & {
  state: { count: number; mode: "UP" | "DOWN" | null };
  onCount: (count: number) => void;
};

const checkSquats = ({ angle, parts, state, onCount }: Detection) => {
  if (parts?.NOSE.x <= 0.5) {
    state.mode = "UP";
  }
  if (parts?.NOSE.x > 0.6 && state.mode === "UP") {
    state.mode = "DOWN";
    state.count = state.count + 1;
    onCount(state.count);
  }

  const points = [
    parts.LEFT_WRIST,
    parts.LEFT_ELBOW,
    parts.LEFT_SHOULDER,
  ] as const;
  // Check if every part is visible
  if (points.every((point) => point?.visibility && point.visibility > 0.5)) {
    // Calculate angle
    console.log(angle(...points));
  }
};
const checkPushups = ({ parts, state, onCount }: Detection) => {
  if (parts?.NOSE.y <= 0.5) {
    state.mode = "UP";
  }
  if (parts?.NOSE.y > 0.6 && state.mode === "UP") {
    state.mode = "DOWN";
    state.count = state.count + 1;
    onCount(state.count);
  }
};

const activityDetections = {
  squat: checkSquats,
  push_up: checkPushups,
  jumping_jack: checkSquats,
};

export const ActivityDetection = ({ workout }: { workout: Workout }) => {
  const state = useRef({ count: 0, mode: null });
  const { currentActivity, counters, incCount, isFinished } = useWorkout();
  const handleDetect = useCallback(
    (args: CheckPoseArgs) => {
      const activity = workout.activities[currentActivity] as WorkoutActivity;
      if (activity) {
        const type = activity.type as keyof typeof activityDetections;
        const fn = activityDetections[type] || (() => {});
        fn({
          ...args,
          state: state.current,
          onCount: (c) => incCount(workout),
        });

        // Record args.parts and store in WorkoutResults
      }
    },
    [currentActivity]
  );
  return (
    <div>
      <Button
        className="mb-2 w-full"
        onClick={() => {
          console.log("next");
          incCount(workout);
        }}
      >
        Start workout
      </Button>
      <PoseEstimation detect={handleDetect} />
      {/* <Button
        className="mt-4"
        onClick={() => {
          console.log("next");
          incCount(workout);
        }}
      >
        Skip
      </Button> */}
    </div>
  );
};
