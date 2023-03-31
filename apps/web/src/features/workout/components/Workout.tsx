import { useClock, useWorkout } from "../store";
import { ONE_MINUTE } from "utils/constants";
import * as t from "../schemas";
import { Button } from "components/Button";
import { useHarmonicIntervalFn } from "react-use";
import { useEffect, useState } from "react";
import { ActivityList } from "./ActivityList";
import { useRouter } from "next/router";

const nowInSec = () => Math.round(Date.now() / 1000);
const parseTime = (time: number) =>
  Math.round(time).toString().padStart(2, "0");

const Duration = ({ length = 0 }) => {
  const router = useRouter();
  const [now, setNow] = useState(0);
  // const { start, stop, startedAt } = useClock();
  const { start, stop, startedAt } = useWorkout();

  const duration = now - Math.round(startedAt / 1000);
  const min = parseTime((duration % (60 * 60)) / 60);
  const sec = parseTime(duration % 60);
  useEffect(() => {
    if (duration > length / 1000) {
      stop();
      router.push(`/workout/done`);
    }
  }, [duration, length]);

  useHarmonicIntervalFn(() => {
    startedAt && setNow(nowInSec());
  }, 1000);

  return startedAt ? (
    <div className="text-white">{startedAt ? `${min}:${sec}` : null}</div>
  ) : (
    <Button size="sm" onClick={() => start()}>
      Start
    </Button>
  );
};

export const Workout = ({ workout }: { workout: t.Workout }) => {
  const { startedAt, currentRound, tick } = useWorkout();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="tracking-widest">
          {workout.type.toUpperCase()} {workout.duration / ONE_MINUTE} min.
        </h3>
        <div className="flex h-10 items-center">
          <Duration length={workout.duration} />
        </div>
      </div>
      <div className="mb-2 uppercase tracking-widest">Round {currentRound}</div>
      <ActivityList {...workout} />

      {process.env.NODE_ENV === "development" ? (
        <Button disabled={!startedAt} onClick={() => tick(workout)}>
          Skip
        </Button>
      ) : null}
    </div>
  );
};
