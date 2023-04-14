import { useWorkout } from "../store";
import { ONE_MINUTE } from "utils/constants";
import { Button } from "components/ui/Button";
import { useHarmonicIntervalFn } from "react-use";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const nowInSec = () => Math.round(Date.now() / 1000);
const parseTime = (time: number) =>
  Math.round(Math.abs(time)).toString().padStart(2, "0");

export const WorkoutTimer = ({ length = 0 }) => {
  const router = useRouter();
  const [now, setNow] = useState(0);
  const { start, stop, startedAt, finishedAt } = useWorkout();

  const duration = now - Math.round(startedAt / 1000);
  const min = parseTime((duration % (60 * 60)) / 60);
  const sec = parseTime(duration % 60);

  console.log(duration, length / 1000);
  useEffect(() => {
    if (duration > length / 1000) {
      stop();
    }
  }, [duration, length]);

  useEffect(() => {
    if (finishedAt) {
      router.push(`/workout/done`);
    }
  }, [finishedAt]);

  useHarmonicIntervalFn(() => {
    startedAt && setNow(nowInSec());
  }, 1000);

  return (
    <div className="mb-4 flex flex-1 items-center justify-between">
      <div className="flex items-center gap-3 text-lg tracking-widest">
        <div className="text-white">
          {duration < 0 ? "-" : ""}
          {min}:{sec}
        </div>
        <span className="text-sm">/</span>
        <div>{length / ONE_MINUTE} min.</div>
      </div>
      <Button
        size="sm"
        disabled={startedAt}
        onClick={() => {
          start();
          setNow(nowInSec());
        }}
      >
        Begin!
      </Button>
    </div>
  );
};
