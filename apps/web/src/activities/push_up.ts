import { Activity } from "activities";

export default function pushup({ calcAngle, parts, state, onCount }: Activity) {
  const left = [
    parts.LEFT_WRIST,
    parts.LEFT_ELBOW,
    parts.LEFT_SHOULDER,
  ] as const;

  const right = [
    parts.RIGHT_WRIST,
    parts.RIGHT_ELBOW,
    parts.RIGHT_SHOULDER,
  ] as const;

  // Calculate angle
  const leftAngle = calcAngle(...left) || 0;
  const rightAngle = calcAngle(...right) || 0;

  if (parts.NOSE?.y <= 0.5 && leftAngle > 120 && rightAngle > 120) {
    state.mode = "UP";
  }
  if (
    parts.NOSE?.y > 0.6 &&
    state.mode === "UP" &&
    leftAngle < 90 &&
    rightAngle < 90
  ) {
    state.mode = "DOWN";
    state.count = state.count + 1;
    onCount();
  }
}
