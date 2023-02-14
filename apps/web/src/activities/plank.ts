import { Activity } from "activities";

export default function plank({ parts, state, calcAngle, onCount }: Activity) {
  // TODO: check body parts for successful squat
  // TODO: handle timer / count every second

  if (state.startedAt) {
    const duration = Math.floor((Date.now() - state.startedAt) / 1000);

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

    if (duration > state.count) {
      state.count = state.count + 1;
      onCount(state.count);
    }
  }
}
