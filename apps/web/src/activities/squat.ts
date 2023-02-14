import { Activity } from "activities";

export default function squat({ parts, state, calcAngle, onCount }: Activity) {
  // Points to calculate angle for
  const left = [parts.LEFT_HEEL, parts.LEFT_KNEE, parts.LEFT_HIP] as const;
  const right = [parts.RIGHT_HEEL, parts.RIGHT_KNEE, parts.RIGHT_HIP] as const;

  // Calculate angles
  const leftAngle = calcAngle(...left);
  const rightAngle = calcAngle(...right);

  // Only one side could be visible
  if ((leftAngle && leftAngle > 120) || (rightAngle && rightAngle > 120)) {
    state.mode = "UP";
  }
  if (
    state.mode === "UP" &&
    ((leftAngle && leftAngle < 90) || (rightAngle && rightAngle < 90))
  ) {
    state.mode = "DOWN";
    state.count = state.count + 1;
    onCount(state.count);
  }
}
