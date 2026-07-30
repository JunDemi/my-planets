import { destinations } from '@/config/portfolio-data';
import { Float, Html } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { AdditiveBlending, Color, MathUtils, Mesh } from 'three';

interface PlanetProps {
  destination: (typeof destinations)[number];
  index: number;
  active: boolean;
  onSelect: (index: number) => void;
}

const Planet = ({ destination, index, active, onSelect }: PlanetProps) => {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * (0.08 + index * 0.012);
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22 + index) * 0.1;
    const scale = active ? 1.16 : hovered ? 1.08 : 1;
    mesh.current.scale.x = MathUtils.damp(mesh.current.scale.x, scale, 5, delta);
    mesh.current.scale.y = MathUtils.damp(mesh.current.scale.y, scale, 5, delta);
    mesh.current.scale.z = MathUtils.damp(mesh.current.scale.z, scale, 5, delta);
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(index);
  };

  return (
    <Float speed={0.65 + index * 0.06} rotationIntensity={0.18} floatIntensity={0.28}>
      <group position={destination.position} scale={destination.size}>
        <mesh
          ref={mesh}
          onClick={handleClick}
          onPointerEnter={(event) => {
            event.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = '';
          }}
        >
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial
            color={destination.color}
            emissive={new Color(destination.color).multiplyScalar(0.22)}
            emissiveIntensity={active ? 1.2 : 0.75}
            metalness={0.32}
            roughness={0.52}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.35, 0.15 + index * 0.1, 0]} scale={1.45}>
          <torusGeometry args={[1, active ? 0.028 : 0.015, 8, 96]} />
          <meshBasicMaterial
            color={destination.color}
            transparent
            opacity={active ? 0.75 : 0.32}
            blending={AdditiveBlending}
          />
        </mesh>
        <Html center position={[0, -1.45, 0]} distanceFactor={8} zIndexRange={[20, 0]}>
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
    </Float>
  );
};

export default Planet;
