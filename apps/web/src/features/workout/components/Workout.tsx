import clsx from "clsx";
import { useWorkout } from "../store";
import { ONE_MINUTE } from "utils/constants";
import * as t from "../schemas";
import { Button } from "components/Button";
import { useHarmonicIntervalFn } from "react-use";
import { useState } from "react";
import { Pause } from "lucide-react";

const nowInSec = () => Math.round(Date.now() / 1000);
const parseTime = (time: number) =>
  Math.round(time).toString().padStart(2, "0");

const Duration = () => {
  const [now, setNow] = useState(0);
  const { start, startedAt } = useWorkout();

  useHarmonicIntervalFn(() => {
    setNow(nowInSec());
  }, 1000);

  const duration = now - Math.round(startedAt / 1000);
  const min = parseTime((duration % (60 * 60)) / 60);
  const sec = parseTime(duration % 60);

  return startedAt ? (
    <div className="text-white">{startedAt ? `${min}:${sec}` : null}</div>
  ) : (
    <Button size="sm" onClick={() => start()}>
      Start
    </Button>
  );
};

export const Workout = ({ workout }: { workout: t.Workout }) => {
  const { currentActivity, counters, start, startedAt, tick } = useWorkout();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h3 className="">AMRAP {workout.duration / ONE_MINUTE} min.</h3>
        <div className="flex h-10 items-center">
          <Duration />
        </div>
      </div>

      <ol className="relative border-l border-zinc-600 text-zinc-500">
        {workout.activities.map((activity, i) => {
          const count = (counters[i] || 0).toString().padStart(2, "0");

          return (
            <li
              key={activity.type}
              className={clsx("ml-4 mb-4", {
                ["text-white"]: currentActivity === i,
              })}
            >
              <div className="absolute -left-1 mt-1.5 h-2 w-2 rounded-full bg-zinc-400" />
              <div>
                {count} / {activity.count} {activity.type}{" "}
                {activity.mode === t.activityModes.time ? "(seconds)" : ""}
              </div>
            </li>
          );
        })}
      </ol>

      {process.env.NODE_ENV === "development" ? (
        <Button onClick={() => tick(workout)}>Skip</Button>
      ) : null}
    </div>
  );
};
