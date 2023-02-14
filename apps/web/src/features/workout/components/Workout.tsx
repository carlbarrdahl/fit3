import clsx from "clsx";
import { useWorkout } from "../store";
import { ONE_MINUTE } from "utils/constants";
import * as t from "../schemas";

export const Workout = ({ workout }: { workout: t.Workout }) => {
  const { currentActivity, counters } = useWorkout();
  return (
    <div>
      <h3 className="mb-8">AMRAP {workout.duration / ONE_MINUTE} min.</h3>

      <ol className="relative border-l border-zinc-600 text-zinc-500">
        {workout.activities.map((activity, i) => (
          <li
            key={activity.type}
            className={clsx("ml-4 mb-4", {
              ["text-white"]: currentActivity === i,
            })}
          >
            <div className="absolute -left-1 mt-1.5 h-2 w-2 rounded-full bg-zinc-400" />
            <div>
              {activity.time
                ? `${activity.time} sec `
                : `${counters[i] || 0} / ${activity.count} `}

              {activity.type}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
