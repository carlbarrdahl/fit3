import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { ActivityDetection } from "features/workout/components/ActivityDetection";
import { Workout } from "features/workout/components/Workout";

import squatActivity from "activities/squat";
import pushupActivity from "activities/push_up";
import plankActivity from "activities/plank";

const ONE_MINUTE = 60 * 1000;
const workout = {
  type: "amrap",
  duration: 10 * ONE_MINUTE,
  activities: [
    { count: 10, type: "squat" },
    { count: 10, type: "push_up" },
    // { count: 10, type: "jumping_jack" },
  ],
};

const activities = {
  squat: squatActivity,
  push_up: pushupActivity,
  plank: plankActivity,
};

const Home: NextPage = () => {
  return (
    <Layout>
      <Workout workout={workout} />
      <ActivityDetection workout={workout} activities={activities} />
    </Layout>
  );
};

export default Home;
