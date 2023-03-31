import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { workouts } from "data/mock";
import Link from "next/link";
import { ActivityList } from "features/workout/components/ActivityList";
import { ONE_MINUTE } from "utils/constants";

const Home: NextPage = () => {
  const workout = workouts.amrap;
  return (
    <Layout>
      <div className="mb-2 uppercase tracking-wider text-zinc-600">
        Today's workout
      </div>
      <Link href={`/workout/today`}>
        <div className="rounded border border-zinc-800 p-4">
          <div className="font-bold">
            {workout.type} {workout.duration / ONE_MINUTE} min.
          </div>
          <div className="pl-6 pt-4">
            <ActivityList {...workout} />
          </div>
        </div>
      </Link>
    </Layout>
  );
};

export default Home;
