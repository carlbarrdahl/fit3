import { useEffect, useRef } from "react";

import {
  Pose,
  InputImage,
  VERSION,
  POSE_CONNECTIONS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
  POSE_LANDMARKS_NEUTRAL,
  NormalizedLandmarkList,
} from "@mediapipe/pose";

import * as cameraUtils from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (videoRef.current) {
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

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      pose.onResults((results) => {
        if (!ctx || !canvas) return void console.log("res", results);

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.poseLandmarks) {
          drawingUtils.drawConnectors(
            ctx,
            results.poseLandmarks,
            POSE_CONNECTIONS,
            { visibilityMin: 0.65, color: "white" }
          );
          drawingUtils.drawLandmarks(
            ctx,
            Object.values(POSE_LANDMARKS_LEFT).map(
              (index) => results.poseLandmarks[index]
            ) as NormalizedLandmarkList,
            { visibilityMin: 0.65, color: "white", fillColor: "rgb(255,138,0)" }
          );
          drawingUtils.drawLandmarks(
            ctx,
            Object.values(POSE_LANDMARKS_RIGHT).map(
              (index) => results.poseLandmarks[index]
            ) as NormalizedLandmarkList,
            { visibilityMin: 0.65, color: "white", fillColor: "rgb(0,217,231)" }
          );
          drawingUtils.drawLandmarks(
            ctx,
            Object.values(POSE_LANDMARKS_NEUTRAL).map(
              (index) => results.poseLandmarks[index]
            ) as NormalizedLandmarkList,
            { visibilityMin: 0.65, color: "white", fillColor: "white" }
          );
        }
        ctx.restore();
      });

      const camera = new cameraUtils.Camera(videoRef.current, {
        facingMode: "user",
        onFrame: async () =>
          pose.send({ image: videoRef.current as InputImage }),
        width: 600,
        height: 600,
      });

      console.log("camera", camera, videoRef.current);
      camera.start();
    }

    // return pose;
  }, [videoRef.current]);

  return (
    <div className="relative">
      <canvas
        width={600}
        height={600}
        ref={canvasRef}
        className="absolute top-0 left-0 w-full"
      />
      <video
        muted
        ref={videoRef}
        //   width="1024"
        //   height="500px"
        // style={{ display: "none" }}
      />
    </div>
  );
};

export default Camera;
