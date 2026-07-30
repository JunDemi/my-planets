import { destinations } from '@/config/portfolio-data';
import { ORBIT_TILT } from '@/config/orbit';
import { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

interface OrbitLinesProps {
  onAdvance: (deltaX: number) => void;
}

const OrbitLines = ({ onAdvance }: OrbitLinesProps) => {
  const dragging = useRef(false);
  const lastPointerX = useRef(0);

  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    [],
  );

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
    onAdvance(event.clientX - lastPointerX.current);
    lastPointerX.current = event.clientX;
  };

  const releasePointer = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    dragging.current = false;
    (event.target as Element).releasePointerCapture(event.pointerId);
    document.body.style.cursor = 'grab';
  };

  return (
    <group rotation={[ORBIT_TILT, 0, 0]}>
      {destinations.map((destination) => (
        <group key={destination.id}>
          <mesh>
            <torusGeometry args={[destination.orbitRadius, 0.006, 4, 160]} />
            <meshBasicMaterial color='#FFF' transparent opacity={0.6} />
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
