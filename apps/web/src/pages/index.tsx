import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import clsx from "clsx";
import dynamic from "next/dynamic";
const WorkoutSchema = z.object({
  type: z.string(),
  duration: z.number(),
  activities: z.array(
    z.object({
      count: z.number(),
      type: z.string(),
    })
  ),
});

type Workout = z.infer<typeof WorkoutSchema>;
const WorkoutOfTheDay = ({ workout }: { workout: Workout }) => {
  const [currentCount] = useState(0);
  const [active] = useState(0);

  return (
    <div>
      <h3 className="mb-8">AMRAP 20 min.</h3>
      <ol className="relative border-l border-zinc-600 text-zinc-500">
        {workout.activities.map((activity, i) => (
          <li
            key={activity.type}
            className={clsx("ml-4 mb-4", { ["text-white"]: active === i })}
          >
            <div className="absolute -left-1 mt-1.5 h-2 w-2 rounded-full bg-zinc-400" />
            <div>
              {currentCount} / {activity.count} {activity.type}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const Camera = dynamic(() => import("components/Camera"), { ssr: false });
const ONE_MINUTE = 60 * 1000;
const workout = {
  type: "amrap",
  duration: 20 * ONE_MINUTE,
  activities: [
    { count: 10, type: "squat" },
    { count: 10, type: "push_up" },
    { count: 10, type: "jumping_jack" },
  ],
};

const Home: NextPage = () => {
  return (
    <Layout>
      <WorkoutOfTheDay workout={workout} />
      <Camera />
    </Layout>
  );
};

export default Home;
