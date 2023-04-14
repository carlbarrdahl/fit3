import { Camera } from "@mediapipe/camera_utils";
import { memo, useEffect, useRef } from "react";
import { useInterval, useRaf, useRafLoop } from "react-use";

import { CheckPoseArgs, createCamera, createPose, render } from "utils/pose";

let camera: Camera;
const pose = createPose();

function usePose(detect: (args: CheckPoseArgs) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = videoRef.current;
    console.log("image", image);

    if (canvas && image) {
      try {
        canvas && pose.onResults(render(canvas, detect));
      } catch (error) {}
      // if (!camera) {
      //   camera = createCamera(image, { onFrame: () => pose.send({ image }) });
      //   camera.start();
      // }
    }
  }, [detect]);
  useInterval(() => {
    const image = videoRef.current;
    if (image) {
      try {
        pose.send({ image });
      } catch (error) {}
    }
  }, 200);

  return { canvasRef, videoRef };
}

type Props = { detect: (args: CheckPoseArgs) => void };

export const PoseEstimation = memo(({ detect }: Props) => {
  const { videoRef, canvasRef } = usePose(detect);

  return (
    <div className="relative">
      <canvas
        width={416}
        height={234}
        ref={canvasRef}
        className="pointer-events-none absolute left-0 top-0 w-full"
      />
      <video
        width={416}
        height={234}
        ref={videoRef}
        muted
        autoPlay
        // src="/videos/pushup.mp4"
        src="/videos/burpee.mp4"
        loop
      />
    </div>
  );
});

export default PoseEstimation;
