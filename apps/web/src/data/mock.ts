import { activityModes, workoutTypes } from "features/workout/schemas";

export const ONE_MINUTE = 60 * 1000;

export const workouts = {
  amrap: {
    type: workoutTypes.amrap,
    // duration: 10 * 1000,
    duration: 10 * ONE_MINUTE,
    activities: [
      { count: 10, type: "squat", mode: activityModes.repeat },
      { count: 10, type: "push_up", mode: activityModes.repeat },
      { count: 30, type: "plank", mode: activityModes.time },
    ],
  },
  emom: {
    type: workoutTypes.emom,
    duration: 15,
    activities: [
      { count: 10, type: "squat", mode: activityModes.repeat },
      // rest
      { count: 10, type: "push_up", mode: activityModes.repeat },
      // rest
    ],
  },
};

export const result = {
  currentActivity: 2,
  currentRound: 2,
  counters: {
    "0": 4,
    "1": 4,
    "2": 11,
  },
  timers: {
    "0": 1680196853850,
    "1": 1680196856018,
    "2": 1680196857502,
    "3": 1680196867739,
    "4": 1680196869922,
    "5": 1680196871514,
  },
  startedAt: 1680196852673,
  finishedAt: 1680196871595,
};
