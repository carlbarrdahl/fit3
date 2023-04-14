import { Camera } from "@mediapipe/camera_utils";
import { memo, useEffect, useRef } from "react";

import { CheckPoseArgs, createCamera, createPose, render } from "utils/pose";

let camera: Camera | null;
const pose = createPose();

function usePose(detect: (args: CheckPoseArgs) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = videoRef.current;

    if (canvas && image) {
      canvas && pose.onResults(render(canvas, detect));
      if (!camera) {
        camera = createCamera(image, { onFrame: () => pose.send({ image }) });
        camera.start();
      }
    }
    return () => {
      camera?.stop();
      camera = null;
    };
  }, [detect]);

  return { canvasRef, videoRef };
}

type Props = { detect: (args: CheckPoseArgs) => void };

export const PoseEstimation = memo(({ detect }: Props) => {
  const { videoRef, canvasRef } = usePose(detect);

  return (
    <div className="relative">
      <canvas
        width={600}
        height={600}
        ref={canvasRef}
        className="absolute left-0 top-0 w-full"
      />
      <video ref={videoRef} muted />
    </div>
  );
});

export default PoseEstimation;
