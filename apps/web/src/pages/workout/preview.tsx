import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { Workout } from "features/workout/components/Workout";

import { workouts } from "data/mock";
import { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { CheckPoseArgs } from "utils/pose";
import { activities } from "activities";
import { useCounter } from "react-use";

const PoseEstimation = dynamic(
  () => import("components/PoseEstimationPreview"),
  {
    ssr: false,
  }
);

const PreviewWorkout: NextPage = () => {
  const state = useRef({ count: 0, mode: null, startedAt: 0 });

  const [counter, { inc }] = useCounter();
  const workout = workouts.amrap;

  const handleDetect = useCallback((args: CheckPoseArgs) => {
    activities.burpee?.func?.({
      ...args,
      state: state.current,
      onCount: () => inc(),
    });
  }, []);

  console.log(counter);
  return (
    <Layout>
      <PoseEstimation detect={handleDetect} />
    </Layout>
  );
};

export default PreviewWorkout;
