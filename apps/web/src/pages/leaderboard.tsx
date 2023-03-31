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
        Leaderboard
      </div>
    </Layout>
  );
};

export default Home;
