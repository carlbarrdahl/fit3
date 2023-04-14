import { Activity } from "activities";

export default {
  name: "Squat",
  description:
    "A lower body exercise targeting the glutes, quadriceps, and hamstrings.",
  func: ({ calcAngle, body, state, onCount }: Activity) => {
    // Points to calculate angle for
    const left = [body.LEFT_HEEL, body.LEFT_KNEE, body.LEFT_HIP] as const;
    const right = [body.RIGHT_HEEL, body.RIGHT_KNEE, body.RIGHT_HIP] as const;

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
      onCount();
    }
  },
};
