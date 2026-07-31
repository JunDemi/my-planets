import { destinations } from '@/config/portfolio-data';
import { ORBIT_TILT } from '@/config/orbit';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

interface OrbitLinesProps {
  onAdvance: (deltaX: number) => void;
}

const OrbitLines = ({ onAdvance }: OrbitLinesProps) => {
  const [orbitColor, setOrbitColor] = useState<string>('#FFF');
  const dragging = useRef(false);

  const lastPointerX = useRef(0);
  const timeoutRef = useRef<number>(0);
  const wheelVelocity = useRef(0);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragging.current = true;
    lastPointerX.current = event.clientX;
    (event.target as Element).setPointerCapture(event.pointerId);
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    event.stopPropagation();
    setOrbitColor('#4cc9f0');
    onAdvance((event.clientX - lastPointerX.current) / 6);
    lastPointerX.current = event.clientX;
  };

  const releasePointer = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    dragging.current = false;
    (event.target as Element).releasePointerCapture(event.pointerId);
    setOrbitColor('#FFF');
    document.body.style.cursor = 'grab';
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // 기존보다 감도 절반 이하
      wheelVelocity.current += -event.deltaY * 0.0012;

      setOrbitColor('#4cc9f0');

      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setOrbitColor('#FFF');
      }, 150);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onAdvance]);

  useFrame((_, delta) => {
    if (Math.abs(wheelVelocity.current) < 0.001) return;

    onAdvance(wheelVelocity.current);

    // 감속(관성)
    wheelVelocity.current *= Math.pow(0.02, delta);

    if (Math.abs(wheelVelocity.current) < 0.001) {
      wheelVelocity.current = 0;
    }
  });

  return (
    <group rotation={[ORBIT_TILT, 0, 0]}>
      {destinations.map((destination) => (
        <group key={destination.id}>
          <mesh>
            <torusGeometry args={[destination.orbitRadius, 0.006, 4, 160]} />
            <meshBasicMaterial color={orbitColor} transparent opacity={0.6} />
          </mesh>
          <mesh
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={releasePointer}
            onPointerCancel={releasePointer}
            onPointerEnter={(event) => {
              event.stopPropagation();
              if (!dragging.current) document.body.style.cursor = 'grab';
            }}
            onPointerLeave={() => {
              if (!dragging.current) document.body.style.cursor = '';
            }}
          >
            <torusGeometry args={[destination.orbitRadius, 0.15, 6, 160]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default OrbitLines;
