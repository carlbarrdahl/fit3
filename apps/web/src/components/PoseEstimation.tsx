import { memo, useEffect, useRef } from "react";

import {
  Pose,
  InputImage,
  VERSION,
  POSE_CONNECTIONS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
  POSE_LANDMARKS_NEUTRAL,
  NormalizedLandmarkList,
  POSE_LANDMARKS,
  Results,
  NormalizedLandmark,
} from "@mediapipe/pose";

import { Camera } from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";

type PoseLandmarkMap = {
  [part in keyof typeof POSE_LANDMARKS]: NormalizedLandmark;
};
export interface CheckPoseArgs {
  parts: PoseLandmarkMap;
  angle: (point1: Point, point2: Point, point3: Point) => number;
}

function drawLandmarks(
  poseLandmarks: NormalizedLandmarkList,
  ctx: CanvasRenderingContext2D
) {
  drawingUtils.drawConnectors(ctx, poseLandmarks, POSE_CONNECTIONS, {
    visibilityMin: 0.65,
    color: "white",
  });
  drawingUtils.drawLandmarks(
    ctx,
    Object.values(POSE_LANDMARKS_LEFT).map(
      (index) => poseLandmarks[index]
    ) as NormalizedLandmarkList,
    { visibilityMin: 0.65, color: "white", fillColor: "rgb(255,138,0)" }
  );
  drawingUtils.drawLandmarks(
    ctx,
    Object.values(POSE_LANDMARKS_RIGHT).map(
      (index) => poseLandmarks[index]
    ) as NormalizedLandmarkList,
    { visibilityMin: 0.65, color: "white", fillColor: "rgb(0,217,231)" }
  );
  drawingUtils.drawLandmarks(
    ctx,
    Object.values(POSE_LANDMARKS_NEUTRAL).map(
      (index) => poseLandmarks[index]
    ) as NormalizedLandmarkList,
    { visibilityMin: 0.65, color: "white", fillColor: "white" }
  );
}

function buildParts(poseLandmarks: NormalizedLandmarkList) {
  return Object.entries(POSE_LANDMARKS).reduce(
    (acc, [part, index]) => ({ ...acc, [part]: poseLandmarks?.[index] }),
    {} as PoseLandmarkMap
  );
}

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

export const PoseEstimation = memo(
  ({ detect }: { detect: (args: CheckPoseArgs) => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      if (videoRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        pose.onResults((results) => {
          if (!ctx || !canvas || !results.poseLandmarks)
            return void console.log("res", results);

          ctx.save();
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          drawLandmarks(results.poseLandmarks, ctx);
          const parts = buildParts(results.poseLandmarks);

          detect({ parts, angle });

          ctx.restore();
        });

        const camera = new Camera(videoRef.current, {
          facingMode: "user",
          onFrame: async () =>
            pose.send({ image: videoRef.current as InputImage }),
          width: 600,
          height: 600,
        });

        console.log(camera);

        console.log("camera", camera, videoRef.current);
        camera.start();
      }
    }, [detect]);

    return (
      <div className="relative">
        <canvas
          width={600}
          height={600}
          ref={canvasRef}
          className="absolute top-0 left-0 w-full"
        />
        <video muted ref={videoRef} />
      </div>
    );
  }
);

type Point = { x: number; y: number };
function angle(point1: Point, point2: Point, point3: Point) {
  let radians =
    Math.atan2(point3.y - point2.y, point3.x - point2.x) -
    Math.atan2(point1.y - point2.y, point1.x - point2.x);

  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }

  return angle;
}

export default PoseEstimation;
