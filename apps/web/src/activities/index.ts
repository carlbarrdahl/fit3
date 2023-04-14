import burpee from "activities/burpee";
import squat from "activities/squat";
import push_up from "activities/push_up";
import plank from "activities/plank";

import { CheckPoseArgs } from "utils/pose";

export const activities = {
  burpee,
  squat,
  push_up,
  plank,
};

export type Activity = CheckPoseArgs & {
  state: { count: number; mode: "UP" | "DOWN" | null; startedAt: number };
  onCount: () => void;
};

export type Activities = Record<
  keyof typeof activities,
  { name: string; description: string; func: (args: Activity) => void }
>;

export const getActivity = (type: string) =>
  activities[type as keyof typeof activities];
