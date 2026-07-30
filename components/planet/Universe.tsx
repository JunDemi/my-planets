import { destinations } from '@/config/portfolio-data';
import { getOrbitPosition } from '@/config/orbit';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { useCallback, useMemo, useRef, useState } from 'react';
import { MathUtils, Vector3 } from 'three';
import OrbitLines from './OrbitLines';
import Planet from './Planet';
import Sun from './Sun';
import { BasicThreeSceneProps } from '../BasicThreeScene';

const Universe = ({ activeIndex, onSelect }: BasicThreeSceneProps) => {
  const reducedMotion = useReducedMotion();
  const lookAt = useRef(new Vector3());
  const targetCamera = useMemo(() => new Vector3(), []);
  const targetLook = useMemo(() => new Vector3(), []);
  const [orbitPhase, setOrbitPhase] = useState(0);

  const advanceOrbits = useCallback((deltaX: number) => {
    setOrbitPhase((current) => current + deltaX * 0.008);
  }, []);

  useFrame((state, delta) => {
    if (activeIndex === null) {
      targetCamera.set(0, 0, 15.5);
      targetLook.set(0, 0, 0);
    } else {
      const destination = destinations[activeIndex];
      const [x, y, z] = getOrbitPosition(
        destination,
        state.clock.elapsedTime,
        orbitPhase,
      );
      targetCamera.set(x + 0.8, y + 0.15, z + 4.5);
      targetLook.set(x + 1.65, y, z);
    }

    const speed = reducedMotion ? 20 : 2.6;
    state.camera.position.x = MathUtils.damp(state.camera.position.x, targetCamera.x, speed, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, targetCamera.y, speed, delta);
    state.camera.position.z = MathUtils.damp(state.camera.position.z, targetCamera.z, speed, delta);
    lookAt.current.x = MathUtils.damp(lookAt.current.x, targetLook.x, speed, delta);
    lookAt.current.y = MathUtils.damp(lookAt.current.y, targetLook.y, speed, delta);
    lookAt.current.z = MathUtils.damp(lookAt.current.z, targetLook.z, speed, delta);
    state.camera.lookAt(lookAt.current);

  });

  return (
    <group>
      <Sun />
      <OrbitLines onAdvance={advanceOrbits} />
      {destinations.map((destination, index) => (
        <Planet
          key={destination.id}
          destination={destination}
          index={index}
          active={activeIndex === index}
          orbitPhase={orbitPhase}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
};

export default Universe;
