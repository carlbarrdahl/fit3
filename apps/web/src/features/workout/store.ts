import { create } from "zustand";
import produce from "immer";
import { Workout, WorkoutActivity } from "./schemas";

interface WorkoutState {
  currentActivity: number;
  currentRound: number;
  counters: { [index: number]: number };
  timers: { [index: number]: number };
  startedAt: number;
  finishedAt: number;
  tick: (workout: Workout) => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const initialState = {
  currentActivity: 0,
  currentRound: 1,
  counters: {},
  timers: {},
  startedAt: 0,
  finishedAt: 0,
};

export const useWorkout = create<WorkoutState>((set) => ({
  ...initialState,
  start: () => set((state) => ({ ...state, startedAt: Date.now() })),
  stop: () => set((state) => ({ ...state, finishedAt: Date.now() })),
  reset: () => set(() => initialState),
  tick: (workout) =>
    set(
      produce((state) => {
        let sound = 0;
        const count = state.counters[state.currentActivity] || 0;
        const activity = workout.activities[
          state.currentActivity
        ] as WorkoutActivity;

        // Set timer for when each new activity starts
        const timerIndex =
          state.currentActivity +
          workout.activities.length * (state.currentRound - 1);

        if (!state.timers[timerIndex]) {
          state.timers[timerIndex] = Date.now();
        }

        // Increment count
        state.counters[state.currentActivity] = count + 1;

        // Change to next activity if done
        if (count % activity?.count === (activity?.count || 0) - 1) {
          state.currentActivity = state.currentActivity + 1;
          sound++;
        }

        if (state.currentActivity === workout.activities.length) {
          // state.stop();
          // state.counters = {};
          state.currentActivity = 0;
          state.currentRound++;
          sound++;
        }

        console.log(JSON.stringify(state, null, 2));
        playSound(sound);
      })
    ),
}));

function playSound(sound: number) {
  // console.log("Play Sound", sound);
}
