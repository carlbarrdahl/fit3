import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { ActivityDetection } from "features/workout/components/ActivityDetection";
import { Workout } from "features/workout/components/Workout";

import squatActivity from "activities/squat";
import pushupActivity from "activities/push_up";
import plankActivity from "activities/plank";
import { result, workouts } from "data/mock";
import { useWorkout } from "features/workout/store";
import { ONE_MINUTE } from "utils/constants";
import * as t from "features/workout/schemas";
import { Button } from "components/Button";
// import * as t from "../../schemas";

const activities = {
  squat: squatActivity,
  push_up: pushupActivity,
  plank: plankActivity,
};

const WorkoutOfTheDay: NextPage = () => {
  const workout = workouts.amrap;

  const a = useWorkout();
  console.log(a);
  return (
    <Layout>
      <h1 className="mb-2 text-center text-2xl uppercase tracking-widest">
        Amazing
      </h1>
      {/* <p className="text-center leading-7">You completed the challenge!</p> */}
      <p className="mb-8 whitespace-pre leading-7">
        {`Great job on completing the AMRAP! 
        
Pushups: 30 reps - Good form!
Situps: 30 reps - Engage your core.
Air squats: 30 reps - Keep your chest up.
Plank: 180 seconds - Excellent hold!

Keep up the hard work!`}
      </p>

      <div className="flex justify-center">
        <Button>Go to leaderboard</Button>
      </div>
      {/* <h3 className="mt-12 tracking-widest">
        {workout.type.toUpperCase()} {workout.duration / ONE_MINUTE} min.
      </h3>

      <ol className="text-zinc-500">
        {workout.activities.map((activity, i) => {
          const count = result.counters[String(i)];
          return (
            <li key={activity.type} className="mb-2">
              <div className="flex justify-between">
                <div>
                  {count} {activity.type}{" "}
                  {activity.mode === t.activityModes.time ? "(seconds)" : ""}
                </div>
              </div>
            </li>
          );
        })}
      </ol> */}

      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    </Layout>
  );
};

export default WorkoutOfTheDay;
