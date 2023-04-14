import { type NextPage } from "next";
import { Check } from "lucide-react";

import clsx from "clsx";
import { Layout } from "layouts/Layout";
import { workouts } from "data/mock";
import Link from "next/link";
import { ONE_MINUTE } from "utils/constants";
import { getActivity } from "activities";

import { H3 } from "components/ui/Text";
import { NotImplemented } from "components/NotImplemented";
import { useWorkout } from "features/workout/store";
import { useEffect } from "react";

const workoutList = [
  workouts.amrap,
  // workouts.amrap, workouts.amrap
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const today = new Date().getDay() - 1;

console.log("today", today);

const Home: NextPage = () => {
  const { reset } = useWorkout();
  const workout = workouts.amrap;

  useEffect(() => {
    reset();
  }, []);
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <H3>Current streak</H3>
          <div className="flex justify-between">
            {weekDays.map((day, i) => (
              <div key={i}>
                <div
                  className={clsx(
                    "flex h-8 w-8 flex-1 items-center justify-center rounded-full",
                    {
                      ["bg-zinc-300 text-zinc-800"]: i === today,
                    }
                  )}
                >
                  {day}
                </div>
                <div className="flex h-6 items-center justify-center">
                  {i >= today ? "•" : "?" || <Check className="h-3 w-3" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <H3>Today's workout</H3>
          <div className="flex gap-2">
            {workoutList.map((workout, i) => (
              <Link href={`/workout/today`} key={i} className="flex-1">
                <div className="rounded border border-zinc-800 py-2 px-4">
                  <div className="mb-4 text-lg font-bold">
                    {workout.duration / ONE_MINUTE} min.
                  </div>
                  <div className="">
                    {workout.activities.map((activity) => {
                      const { name, description } = getActivity(activity.type);
                      return (
                        <div key={activity.type} className="mb-4">
                          <div>
                            {activity.count} {name}:{" "}
                            <span className="text-zinc-500">{description}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <H3>Past workouts</H3>
          <NotImplemented />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
