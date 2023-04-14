import { Activity } from "activities";

export default {
  name: "Plank",
  description:
    "A core exercise targeting the rectus abdominis, transverse abdominis, and obliques.",
  func: ({ calcAngle, body, state, onCount }: Activity) => {
    // Alternate between 1 and 0 every half second (tick tock)
    const tick = Math.floor(Date.now() / 500) % 2;

    // Points to calculate angle for
    const left = [body.LEFT_WRIST, body.LEFT_SHOULDER, body.LEFT_HEEL] as const;
    const right = [
      body.RIGHT_WRIST,
      body.RIGHT_SHOULDER,
      body.RIGHT_HEEL,
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
  },
};
