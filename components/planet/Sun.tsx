import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { AdditiveBlending, BackSide, Group, Mesh } from 'three';

const Sun = () => {
  const sun = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const glow = useRef<Mesh>(null);
  const glowOuter = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (sun.current) {
      sun.current.rotation.y += delta * 0.08;
    }

    if (core.current) {
      core.current.rotation.x += delta * 0.035;
      core.current.rotation.z -= delta * 0.025;
    }

    if (glow.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.035;
      glow.current.scale.setScalar(pulse);
    }

    if (glowOuter.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.9 + 1.5) * 0.05;
      glowOuter.current.scale.setScalar(2.8 * pulse);
    }

  });

  return (
    <group ref={sun}>
      <pointLight color='#ffb84d' intensity={30} distance={15} decay={1.5} />

      {/* Core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.4, 5]} />
        <meshStandardMaterial color='#fde5ad' emissive='#ff7a18' emissiveIntensity={3} roughness={0.7} />
      </mesh>

      {/* Inner Glow */}
      <mesh ref={glow} scale={1.2}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshBasicMaterial
          color='#ffb347'
          transparent
          opacity={0.22}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Middle Glow */}
      <mesh scale={1.55}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshBasicMaterial
          color='#ff9f43'
          transparent
          opacity={0.1}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Glow */}
      <mesh scale={2.0}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshBasicMaterial
          color='#ff7a18'
          transparent
          opacity={0.045}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Very Soft Halo */}
      <mesh scale={2.8}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshBasicMaterial
          color='#ffd280'
          transparent
          opacity={0.015}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default Sun;
