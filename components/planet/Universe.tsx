import { destinations } from '@/config/portfolio-data';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { Group, MathUtils, Vector3 } from 'three';
import OrbitLines from './OrbitLines';
import Planet from './Planet';
import { BasicThreeSceneProps } from '../BasicThreeScene';

const Universe = ({ activeIndex, onSelect }: BasicThreeSceneProps) => {
  const reducedMotion = useReducedMotion();
  const world = useRef<Group>(null);
  const lookAt = useRef(new Vector3());
  const targetCamera = useMemo(() => new Vector3(), []);
  const targetLook = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    if (activeIndex === null) {
      targetCamera.set(0, 0, 15.5);
      targetLook.set(0, 0, 0);
    } else {
      const destination = destinations[activeIndex];
      targetCamera.set(destination.position[0] + 0.8, destination.position[1] + 0.15, destination.position[2] + 4.5);
      targetLook.set(destination.position[0] + 1.65, destination.position[1], destination.position[2]);
    }

    const speed = reducedMotion ? 20 : 2.6;
    state.camera.position.x = MathUtils.damp(state.camera.position.x, targetCamera.x, speed, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, targetCamera.y, speed, delta);
    state.camera.position.z = MathUtils.damp(state.camera.position.z, targetCamera.z, speed, delta);
    lookAt.current.x = MathUtils.damp(lookAt.current.x, targetLook.x, speed, delta);
    lookAt.current.y = MathUtils.damp(lookAt.current.y, targetLook.y, speed, delta);
    lookAt.current.z = MathUtils.damp(lookAt.current.z, targetLook.z, speed, delta);
    state.camera.lookAt(lookAt.current);

    if (world.current && activeIndex === null && !reducedMotion) {
      world.current.rotation.z += delta * 0.008;
    }
  });

  return (
    <group ref={world}>
      <OrbitLines />
      {destinations.map((destination, index) => (
        <Planet
          key={destination.id}
          destination={destination}
          index={index}
          active={activeIndex === index}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
};

export default Universe;
