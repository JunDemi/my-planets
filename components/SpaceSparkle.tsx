import { Sparkles } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

interface SpaceSparklesProps {
  color: string;
  speed: number;
  opacity: number;
}

const SpaceSparkles = ({ color, speed, opacity }: SpaceSparklesProps) => {
  const { viewport } = useThree();

  return (
    <Sparkles
      count={50}
      scale={[viewport.width, viewport.height, 10]}
      size={5}
      speed={speed}
      opacity={opacity}
      color={color}
    />
  );
};

export default SpaceSparkles;
