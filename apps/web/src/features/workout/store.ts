import { create } from "zustand";
import produce from "immer";
import { Workout } from "./schemas";

interface WorkoutState {
  currentActivity: number;
  counters: { [index: number]: number };
  startedAt: number;
  finishedAt: number;
  tick: (workout: Workout) => void;
  start: () => void;
  stop: () => void;
}

export const useWorkout = create<WorkoutState>((set) => ({
  currentActivity: 0,
  counters: {},
  startedAt: 0,
  finishedAt: 0,
  start: () => set((state) => ({ ...state, startedAt: Date.now() })),
  stop: () => set((state) => ({ ...state, finishedAt: Date.now() })),
  tick: (workout) =>
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
          // state.stop();
          state.counters = {};
          state.currentActivity = 0;
          sound++;
        }

        playSound(sound);
      })
    ),
}));

function playSound(sound: number) {
  console.log("Play Sound", sound);
}
