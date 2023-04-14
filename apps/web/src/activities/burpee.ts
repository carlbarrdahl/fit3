import { Activity } from "activities";

function createState(sequence: string[], state = 0) {
  function getState() {
    return sequence[state % sequence.length];
  }

  function next() {
    state++;
    return getState();
  }

  return { getState, next };
}

const sequence = ["idle", "down", "up", "jump"];
const machine = createState(sequence);

function isStraight({ body, calcAngle, mergeSides }: Activity) {
  const left = [body.LEFT_ANKLE, body.LEFT_HIP, body.LEFT_EAR];
  const right = [body.RIGHT_ANKLE, body.RIGHT_HIP, body.RIGHT_EAR];

  const angle = calcAngle(...mergeSides(left, right)) || 0;

  return angle && angle > 150;
}

function isPushup(args: Activity) {
  if (!isStraight(args)) return null;
  const { body, calcAngle, mergeSides } = args;

  const left = [body.LEFT_WRIST, body.LEFT_ELBOW, body.LEFT_SHOULDER];
  const right = [body.RIGHT_WRIST, body.RIGHT_ELBOW, body.RIGHT_SHOULDER];

  const angle = calcAngle(...mergeSides(left, right)) || 0;

  if (body.NOSE?.y < 0.5 && angle > 120) {
    return "UP";
  }

  if (body.NOSE?.y > 0.6 && angle < 90) {
    return "DOWN";
  }
}

function isSquat(args: Activity) {
  const { body, calcAngle, mergeSides } = args;

  const left = [body.LEFT_HEEL, body.LEFT_KNEE, body.LEFT_HIP];
  const right = [body.RIGHT_HEEL, body.RIGHT_KNEE, body.RIGHT_HIP];

  const angle = calcAngle(...mergeSides(left, right)) || 0;

  if (angle > 120) {
    return "UP";
  }

  if (angle < 90) {
    return "DOWN";
  }
}

function isJump(args: Activity) {
  if (!isStraight(args)) return false;
  const { body, calcAngle, mergeSides } = args;

  return body.NOSE.y < 0.4;
}

export default {
  name: "Burpee",
  description: "...",
  func: (args: Activity) => {
    const { body, calcAngle, mergeSides } = args;

    // Push-up DOWN
    // Push-up UP
    // Jump

    console.log(isPushup(args));

    const pushup = isPushup(args);
    const squat = isSquat(args);
    const jump = isJump(args);

    console.log({ pushup, squat, jump });
    // return;
    // const left = [body.LEFT_WRIST, body.LEFT_ELBOW, body.LEFT_SHOULDER];
    // const right = [body.RIGHT_WRIST, body.RIGHT_ELBOW, body.RIGHT_SHOULDER];

    // const back = [body.LEFT_ANKLE, body.LEFT_HIP, body.LEFT_EAR];

    // const leftAngle = calcAngle(...left) || 0;
    // const rightAngle = calcAngle(...right) || 0;
    // const angle = calcAngle(...mergeSides(left, right));

    // return;
    // const backAngle = calcAngle(...back) || 0;

    // const isDown =
    //   body.NOSE.y < 0.5 &&
    //   backAngle > 150 &&
    //   (leftAngle > 120 || rightAngle > 120);

    // const isUp =
    //   body.NOSE.y < 0.5 &&
    //   backAngle > 150 &&
    //   (leftAngle < 90 || rightAngle < 90);

    // // console.log(backAngle, isDown, isUp);

    // if (backAngle > 150) {
    // }

    // // return;
    // // Check down
    // if (
    //   body.NOSE?.y <= 0.5 &&
    //   backAngle > 150 &&
    //   (leftAngle > 120 || rightAngle > 120)
    // ) {
    //   console.log("up");
    //   state.mode = "UP";
    // }
    // if (
    //   body.NOSE?.y > 0.6 &&
    //   backAngle > 150 &&
    //   // state.mode === "UP" &&
    //   (leftAngle < 90 || rightAngle < 90)
    // ) {
    //   console.log("down");
    //   state.mode = "DOWN";
    //   // state.count = state.count + 1;
    //   // onCount();
    // }
    // // console.log(body.LEFT_WRIST.y);
    // if (body.LEFT_WRIST.y < 0.3) {
    //   console.log("jump");
    // }
  },
};
