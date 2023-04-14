import { Activity } from "activities";

export default {
  name: "Push-up",
  description:
    "An upper body exercise targeting the chest muscles, triceps, and shoulders.",
  func: ({ calcAngle, body, state, onCount }: Activity) => {
    const left = [
      body.LEFT_WRIST,
      body.LEFT_ELBOW,
      body.LEFT_SHOULDER,
    ] as const;

    const right = [
      body.RIGHT_WRIST,
      body.RIGHT_ELBOW,
      body.RIGHT_SHOULDER,
    ] as const;

    const leftBack = [body.LEFT_ANKLE, body.LEFT_HIP, body.LEFT_EAR];
    const rightBack = [body.RIGHT_ANKLE, body.RIGHT_HIP, body.RIGHT_EAR];

    // Calculate angles
    const leftAngle = calcAngle(...left) || 0;
    const rightAngle = calcAngle(...right) || 0;
    const leftBackAngle = calcAngle(...leftBack) || 0;
    const rightBackAngle = calcAngle(...rightBack) || 0;

    if (body.NOSE?.y <= 0.5 && (leftAngle > 120 || rightAngle > 120)) {
      state.mode = "UP";
    }
    if (
      body.NOSE?.y > 0.6 &&
      state.mode === "UP" &&
      (leftAngle < 90 || rightAngle < 90)
    ) {
      state.mode = "DOWN";
      state.count = state.count + 1;
      onCount();
    }
  },
};
