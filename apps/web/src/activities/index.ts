import { CheckPoseArgs } from "utils/pose";

export type Activity = CheckPoseArgs & {
  state: { count: number; mode: "UP" | "DOWN" | null };
  onCount: (count: number) => void;
};
