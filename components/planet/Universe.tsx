import { destinations } from '@/config/portfolio-data';
import { getOrbitPosition } from '@/config/orbit';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Group, MathUtils, Vector3 } from 'three';
import OrbitLines from './OrbitLines';
import Planet from './Planet';
import Sun from './Sun';
import { BasicThreeSceneProps } from '../BasicThreeScene';
import { Html } from '@react-three/drei';

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const UniverseWrapper = ({ children }: { children: React.ReactNode }) => {
  const reducedMotion = useReducedMotion();
  const [started, setStarted] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setStarted(true);
      });
    });
  }, []);

  const group = useRef<Group>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const introProgress = useRef(reducedMotion ? 1 : 0);

  useFrame((_, delta) => {
    if (!started) return;
    if (introProgress.current >= 1) return;

    introProgress.current = Math.min(1, introProgress.current + delta / 2);
    const progress = easeOutCubic(introProgress.current);

    if (group.current) {
      group.current.scale.setScalar(Math.max(progress, 0.001));
    }

    if (overlay.current) {
      overlay.current.style.opacity = String(1 - progress);
      if (introProgress.current >= 1) {
        overlay.current.style.display = 'none';
      }
    }
  });

  return (
    <>
      <group ref={group} scale={reducedMotion ? 1 : 0.001}>
        {children}
      </group>
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div
          ref={overlay}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            opacity: reducedMotion ? 0 : 1,
            display: reducedMotion ? 'none' : 'block',
          }}
        />
      </Html>
    </>
  );
};

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
      const [x, y, z] = getOrbitPosition(destination, state.clock.elapsedTime, orbitPhase);
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
    <UniverseWrapper>
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
    </UniverseWrapper>
  );
};

export default Universe;
