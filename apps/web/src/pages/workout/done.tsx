import { type NextPage } from "next";

import { Layout } from "layouts/Layout";

import { workouts } from "data/mock";
import { useWorkout } from "features/workout/store";
import { Button } from "components/ui/Button";
import { getActivity } from "activities";
import Link from "next/link";
import { LoginButton } from "features/auth/components/LoginButton";

const labels = {
  repeat: "reps",
  time: "seconds",
};
const WorkoutOfTheDay: NextPage = () => {
  const workout = workouts.amrap;

  const { counters, ...a } = useWorkout();
  console.log(a);
  return (
    <Layout>
      <h1 className="mb-2 text-center text-2xl uppercase tracking-widest">
        Amazing
      </h1>
      <p className="mb-8 whitespace-pre leading-7">
        {`Great job on completing the workout! 

${workout.activities
  .map((activity, i) => {
    const { name } = getActivity(activity.type);
    return `${name}: ${counters[i] || 0} ${labels[activity.mode]}`;
  })
  .join("\n")}

Keep up the hard work!
`}
      </p>

      <div className="flex justify-center">
        <Button as={Link} href="/leaderboard">
          Go to leaderboard
        </Button>
      </div>

      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    </Layout>
  );
};

export default WorkoutOfTheDay;
