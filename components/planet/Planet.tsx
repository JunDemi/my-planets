import { destinations } from '@/config/portfolio-data';
import { getOrbitPosition } from '@/config/orbit';
import { Html } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group, MathUtils } from 'three';
import GlbModel from './GlbModel';

interface PlanetProps {
  destination: (typeof destinations)[number];
  index: number;
  active: boolean;
  orbitPhase: number;
  onSelect: (index: number) => void;
}

const Planet = ({ destination, index, active, orbitPhase, onSelect }: PlanetProps) => {
  const orbitingPlanet = useRef<Group>(null);
  const visual = useRef<Group>(null);
  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const rotationTarget = useRef({ x: 0, y: index * 0.2 });
  const [hovered, setHovered] = useState(false);

  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    [],
  );

  useFrame((state, delta) => {
    if (!orbitingPlanet.current || !visual.current) return;
    const [x, y, z] = getOrbitPosition(destination, state.clock.elapsedTime, orbitPhase);
    orbitingPlanet.current.position.set(x, y, z);

    if (!dragging.current) {
      rotationTarget.current.y += delta * (0.08 + destination.rotateSpeed);
    }

    visual.current.rotation.x = MathUtils.damp(visual.current.rotation.x, rotationTarget.current.x, 12, delta);
    visual.current.rotation.y = MathUtils.damp(visual.current.rotation.y, rotationTarget.current.y, 12, delta);

    const scale = active ? 2.1 : hovered ? 1.15 : 1;
    visual.current.scale.x = MathUtils.damp(visual.current.scale.x, scale, 5, delta);
    visual.current.scale.y = MathUtils.damp(visual.current.scale.y, scale, 5, delta);
    visual.current.scale.z = MathUtils.damp(visual.current.scale.z, scale, 5, delta);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragging.current = true;
    dragMoved.current = false;
    lastPointer.current = { x: event.clientX, y: event.clientY };
    (event.target as Element).setPointerCapture(event.pointerId);
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    event.stopPropagation();

    const deltaX = event.clientX - lastPointer.current.x;
    const deltaY = event.clientY - lastPointer.current.y;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 1) {
      dragMoved.current = true;
    }

    rotationTarget.current.y += deltaX * 0.012;
    rotationTarget.current.x = MathUtils.clamp(rotationTarget.current.x + deltaY * 0.012, -Math.PI / 2, Math.PI / 2);
    lastPointer.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    event.stopPropagation();
    dragging.current = false;
    (event.target as Element).releasePointerCapture(event.pointerId);
    document.body.style.cursor = hovered ? 'grab' : '';

    if (!dragMoved.current) {
      onSelect(index);
    }
  };

  const handlePointerCancel = (event: ThreeEvent<PointerEvent>) => {
    dragging.current = false;
    dragMoved.current = false;
    (event.target as Element).releasePointerCapture(event.pointerId);
    document.body.style.cursor = '';
  };

  return (
    <group ref={orbitingPlanet} scale={destination.size}>
      <group rotation={[destination.axialTilt, 0, 0]}>
        {/* 자전축 기울기 */}
        <group
          ref={visual}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerEnter={(event) => {
            event.stopPropagation();
            setHovered(true);
            if (!dragging.current) document.body.style.cursor = 'grab';
          }}
          onPointerLeave={() => {
            setHovered(false);
            if (!dragging.current) document.body.style.cursor = '';
          }}
        >
          <GlbModel modelPath={destination.modelPath} active={active} />
        </group>
      </group>
      <Html center position={[0, 1.45, 0]} distanceFactor={8} zIndexRange={[100, 0]}>
        <button
          type='button'
          onClick={() => onSelect(index)}
          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] backdrop-blur-md transition-colors ${
            active
              ? 'border-accent/70 bg-surface-scene/90 text-foreground'
              : 'border-white/15 hover:border-white/35 bg-surface-scene/60 text-muted hover:text-foreground'
          }`}
        >
          {destination.label}
        </button>
      </Html>
    </group>
  );
};

export default Planet;
