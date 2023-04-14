import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { Workout } from "features/workout/components/Workout";

import { workouts } from "data/mock";

const WorkoutOfTheDay: NextPage = () => {
  const workout = workouts.amrap;
  return (
    <Layout>
      <Workout workout={workout} />
    </Layout>
  );
};

export default WorkoutOfTheDay;
