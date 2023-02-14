import { create } from "zustand";
import produce from "immer";
import { Workout } from "./schemas";

interface WorkoutState {
  isFinished: boolean;
  currentActivity: number;
  counters: { [index: number]: number };
  incCount: (workout: Workout) => void;
}
export const useWorkout = create<WorkoutState>((set) => ({
  currentActivity: 0,
  counters: {},
  isFinished: false,
  incCount: (workout) =>
    set(
      produce((state) => {
        let sound = 0;
        const count = state.counters[state.currentActivity] || 0;
        const activity = workout.activities[state.currentActivity];

        // Increment count
        state.counters[state.currentActivity] = count + 1;

        // Change to next activity if done
        if (count === (activity?.count || 0) - 1) {
          state.currentActivity = state.currentActivity + 1;
          sound++;
        }

        if (state.currentActivity === workout.activities.length) {
          state.isFinished = true;
          sound++;
        }

        playSound(sound);
      })
    ),
}));

function playSound(sound: number) {
  console.log("Play Sound", sound);
}
