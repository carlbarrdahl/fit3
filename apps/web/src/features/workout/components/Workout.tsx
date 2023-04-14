import { useWorkout } from "../store";
import * as t from "../schemas";
import { Button } from "components/ui/Button";
import { ActivityList } from "./ActivityList";
import { WorkoutTimer } from "./Timer";
import { ActivityDetection } from "./ActivityDetection";
import { activities } from "activities";

type Props = { workout: t.Workout };

export const Workout = ({ workout }: Props) => {
  const { currentRound } = useWorkout();

  return (
    <div>
      <WorkoutTimer length={workout.duration} />

      <div className="mb-2 uppercase tracking-widest">Round {currentRound}</div>
      <ActivityList {...workout} />

      <DevControls workout={workout} />

      <ActivityDetection activities={activities} workout={workout} />
    </div>
  );
};

const DevControls = ({ workout }: { workout: t.Workout }) => {
  const { startedAt, tick, stop } = useWorkout();

  return process.env.NODE_ENV === "development" ? (
    <div className="mb-2 flex gap-1">
      <Button disabled={!startedAt} onClick={() => tick(workout)}>
        Skip
      </Button>
      <Button disabled={!startedAt} onClick={() => stop()}>
        Finish workout
      </Button>
    </div>
  ) : null;
};
