import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { ActivityDetection } from "features/workout/components/ActivityDetection";
import { Workout } from "features/workout/components/Workout";

import squatActivity from "activities/squat";
import pushupActivity from "activities/push_up";
import plankActivity from "activities/plank";
import { activityModes, activityTypes } from "features/workout/schemas";
import { useWorkout } from "features/workout/store";
import { useState } from "react";

const ONE_MINUTE = 60 * 1000;

const workouts = {
  amrap: {
    type: activityTypes.amrap,
    duration: 10 * ONE_MINUTE,
    activities: [
      { count: 10, type: "squat", mode: activityModes.repeat },
      { count: 10, type: "push_up", mode: activityModes.repeat },
      { count: 30, type: "plank", mode: activityModes.time },
    ],
  },
  emom: {},
};

const activities = {
  squat: squatActivity,
  push_up: pushupActivity,
  plank: plankActivity,
};

const Home: NextPage = () => {
  return (
    <Layout>
      <Workout workout={workouts.amrap} />
      <ActivityDetection workout={workouts.amrap} activities={activities} />
    </Layout>
  );
};

export default Home;
