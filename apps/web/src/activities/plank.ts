import { Activity } from "activities";

export default function plank({ parts, state, calcAngle, onCount }: Activity) {
  // Alternate between 1 and 0 every half second (tick tock)
  const tick = Math.floor(Date.now() / 500) % 2;

  // Points to calculate angle for
  const left = [
    parts.LEFT_WRIST,
    parts.LEFT_SHOULDER,
    parts.LEFT_HEEL,
  ] as const;
  const right = [
    parts.RIGHT_WRIST,
    parts.RIGHT_SHOULDER,
    parts.RIGHT_HEEL,
  ] as const;

  // Calculate angles
  const leftAngle = calcAngle(...left);
  const rightAngle = calcAngle(...right);

  // TODO: check body parts for successful plank before counting
  if (state.mode === "UP" && tick) {
    onCount();
    state.mode = "DOWN";
  }
  if (!tick) {
    state.mode = "UP";
  }
}
