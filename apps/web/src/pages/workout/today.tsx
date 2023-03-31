import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { ActivityDetection } from "features/workout/components/ActivityDetection";
import { Workout } from "features/workout/components/Workout";

import squatActivity from "activities/squat";
import pushupActivity from "activities/push_up";
import plankActivity from "activities/plank";
import { workouts } from "data/mock";

const activities = {
  squat: squatActivity,
  push_up: pushupActivity,
  plank: plankActivity,
};

const WorkoutOfTheDay: NextPage = () => {
  const workout = workouts.amrap;
  return (
    <Layout>
      <Workout workout={workout} />
      <ActivityDetection workout={workout} activities={activities} />
    </Layout>
  );
};

export default WorkoutOfTheDay;
