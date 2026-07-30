import { Sparkles } from '@react-three/drei';

interface SpaceSparklesProps {
  color: string;
  speed: number;
  opacity: number;
}

const SpaceSparkles = ({ color, speed, opacity }: SpaceSparklesProps) => {
  return (
    <Sparkles
      count={50}
      scale={[30, 18, 24]}
      size={5}
      speed={speed}
      opacity={opacity}
      color={color}
    />
  );
};

export default SpaceSparkles;
