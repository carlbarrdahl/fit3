import {
  Pose,
  InputImage,
  VERSION,
  POSE_CONNECTIONS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
  POSE_LANDMARKS_NEUTRAL,
  NormalizedLandmarkList,
  NormalizedLandmark,
  Results,
} from "@mediapipe/pose";

import { Camera, CameraOptions } from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";

const {
  LEFT_EYE_INNER,
  LEFT_EYE_OUTER,
  RIGHT_EYE_INNER,
  RIGHT_EYE_OUTER,
  ...ACTIVE_PARTS
} = {
  ...POSE_LANDMARKS_LEFT,
  ...POSE_LANDMARKS_RIGHT,
  ...POSE_LANDMARKS_NEUTRAL,
};

type PoseLandmarkMap = {
  [part in keyof typeof ACTIVE_PARTS]: NormalizedLandmark;
};

type Point = { x: number; y: number };

export interface CheckPoseArgs {
  parts: PoseLandmarkMap;
  calcAngle: (point1?: Point, point2?: Point, point3?: Point) => number | null;
}

const styles = {
  connectors: { visibilityMin: 0.65, color: "white" },
  landmarks: { visibilityMin: 0.6, color: "white", fillColor: "#06b6d4" },
};

function drawLandmarks(
  poseLandmarks: NormalizedLandmarkList,
  ctx: CanvasRenderingContext2D
) {
  drawingUtils.drawConnectors(
    ctx,
    poseLandmarks,
    POSE_CONNECTIONS,
    styles.connectors
  );
  drawingUtils.drawLandmarks(
    ctx,
    Object.values(ACTIVE_PARTS).map(
      (index) => poseLandmarks[index]
    ) as NormalizedLandmarkList,
    styles.landmarks
  );
}

export function createPose() {
  const pose = new Pose({
    locateFile: (file: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${VERSION}/${file}`,
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  return pose;
}

export function createCamera(
  image: HTMLVideoElement,
  { onFrame }: CameraOptions
) {
  return new Camera(image, {
    facingMode: "user",
    width: 600,
    height: 600,
    onFrame,
  });
}

export function render(
  canvas: HTMLCanvasElement,
  detect: (args: CheckPoseArgs) => void
) {
  const ctx = canvas?.getContext("2d");
  return (results: Results) => {
    if (!ctx || !canvas || !results.poseLandmarks) return;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLandmarks(results.poseLandmarks, ctx);

    detect({ parts: buildParts(results.poseLandmarks), calcAngle });

    ctx.restore();
  };
}

const VISIBILITY_THRESHOLD = 0.5;
export function buildParts(poseLandmarks: NormalizedLandmarkList) {
  return Object.entries(ACTIVE_PARTS).reduce((acc, [part, index]) => {
    const landmark = poseLandmarks?.[index];
    return (landmark?.visibility as number) >= VISIBILITY_THRESHOLD
      ? { ...acc, [part]: landmark }
      : acc;
  }, {} as PoseLandmarkMap);
}

export function calcAngle(point1?: Point, point2?: Point, point3?: Point) {
  if (!(point1 && point2 && point3)) return null;

  let radians =
    Math.atan2(point3.y - point2.y, point3.x - point2.x) -
    Math.atan2(point1.y - point2.y, point1.x - point2.x);

  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }

  return angle;
}
