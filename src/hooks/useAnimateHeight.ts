import { useRef, MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Object3D } from 'three';

// Type for the animation object
interface Animation {
  targetHeight: number;
  progress: number;
  initialHeight: number;
}

// Elastic out easing function.
const elasticOutEasing = (t: number, p: number = 0.3): number => {
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
};

// Custom hook to animate height.
const useAnimateHeight = (
  elementRef: MutableRefObject<Object3D | null>,
  targetHeight: number,
  startHeight: number = 0
): void => {
  const animation = useRef<Animation>({
    targetHeight,
    progress: 0,
    initialHeight: startHeight
  });

  useFrame((state, delta) => {
    // Target height has changed.
    if (animation.current.targetHeight !== targetHeight) {
      animation.current.targetHeight = targetHeight;
      animation.current.progress = 0;
      animation.current.initialHeight = elementRef.current ? elementRef.current.position.y : 0;
    }

    // Increment progress.
    animation.current.progress += delta;
    animation.current.progress = MathUtils.clamp(animation.current.progress, 0, 1);

    // Get eased progress.
    const easedProgress = elasticOutEasing(animation.current.progress);

    // Get current height.
    const currentHeight = MathUtils.lerp(
      animation.current.initialHeight,
      animation.current.targetHeight,
      easedProgress
    );

    // Update element position.
    if (elementRef.current) {
      elementRef.current.position.y = currentHeight;
    }
  });
};

export default useAnimateHeight;
