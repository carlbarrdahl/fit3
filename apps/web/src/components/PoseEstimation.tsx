import { InputImage } from "@mediapipe/pose";
import { memo, useEffect, useRef } from "react";

import { CheckPoseArgs, createCamera, createPose, render } from "utils/pose";

const pose = createPose();

function usePose(detect: (args: CheckPoseArgs) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = videoRef.current;
    if (canvas && image) {
      canvas && pose.onResults(render(canvas, detect));

      const camera = createCamera(image, {
        onFrame: () => pose.send({ image }),
      });
      console.log(camera);

      camera.start();
    }
  }, [detect]);

  return { canvasRef, videoRef };
}

export const PoseEstimation = memo(
  ({ detect }: { detect: (args: CheckPoseArgs) => void }) => {
    const { videoRef, canvasRef } = usePose(detect);
    return (
      <div className="relative">
        <canvas
          width={600}
          height={600}
          ref={canvasRef}
          className="absolute top-0 left-0 w-full"
        />

        <video ref={videoRef} muted />
      </div>
    );
  }
);

export default PoseEstimation;
