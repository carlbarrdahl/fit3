import clsx from "clsx";
import { useWorkout } from "../store";
import * as t from "../schemas";

type Props = { activities: t.WorkoutActivity[] };
export const ActivityList = ({ activities }: Props) => {
  const { currentActivity, counters } = useWorkout();

  return (
    <ol className="relative border-l border-zinc-600 text-zinc-500">
      {activities.map((activity, i) => {
        const count =
          // If activity is done, show all the reps
          currentActivity > i
            ? activity.count
            : // Otherwise count each rep
              (counters[i] || 0) % activity.count;

        return (
          <li
            key={activity.type}
            className={clsx("ml-4 mb-4", {
              ["text-white"]: currentActivity === i,
            })}
          >
            <div className="absolute -left-1 mt-1.5 h-2 w-2 rounded-full bg-zinc-400" />
            <div className="flex justify-between">
              <div>
                {count.toString().padStart(2, "0")} / {activity.count}{" "}
                {activity.type}{" "}
                {activity.mode === t.activityModes.time ? "(seconds)" : ""}
              </div>
              <div>{counters[i]}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
