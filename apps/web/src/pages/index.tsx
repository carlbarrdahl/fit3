import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { ActivityDetection } from "features/workout/components/ActivityDetection";
import { Workout } from "features/workout/components/Workout";

const ONE_MINUTE = 60 * 1000;
const workout = {
  type: "amrap",
  duration: 10 * ONE_MINUTE,
  activities: [
    { count: 2, type: "squat" },
    { count: 2, type: "push_up" },
    { count: 2, type: "jumping_jack" },
  ],
};

const Home: NextPage = () => {
  return (
    <Layout>
      <Workout workout={workout} />
      <ActivityDetection workout={workout} />
    </Layout>
  );
};

export default Home;
