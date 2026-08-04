import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BackSide,
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  Sphere,
} from 'three';
import { storageUrl } from '@/config/portfolio-data';

const Sun = () => {
  const sun = useRef<Group>(null);
  const core = useRef<Group>(null);
  const glow = useRef<Mesh>(null);
  const glowOuter = useRef<Mesh>(null);

  const { scene } = useGLTF(`${storageUrl}/planet/sun.glb`);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      child.material = Array.isArray(child.material) ? child.material.map((m) => m.clone()) : child.material.clone();
    });

    // 중심 보정
    const box = new Box3().setFromObject(clone);
    const sphere = new Sphere();

    box.getBoundingSphere(sphere);

    clone.position.sub(sphere.center);

    // 모든 모델을 같은 기준 크기로 정규화
    const radius = sphere.radius;
    const targetRadius = 0.7; // 태양 크기

    const scale = targetRadius / radius;
    clone.scale.setScalar(scale);

    return clone;
  }, [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((material) => {
        if (!(material instanceof MeshStandardMaterial)) return;

        material.emissive.set('#ff7a18');
        material.emissiveIntensity = 3;
        material.needsUpdate = true;
      });
    });
  }, [model]);

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
      glow.current.scale.setScalar(1.2 * pulse);
    }

    if (glowOuter.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.9 + 1.5) * 0.05;
      glowOuter.current.scale.setScalar(2.8 * pulse);
    }
  });

  return (
    <group ref={sun}>
      <pointLight color='#ffb84d' intensity={30} distance={15} decay={1.5} />

      {/* GLB Sun */}
      <group ref={core}>
        <primitive object={model} />
      </group>

      {/* Inner Glow */}
      <mesh ref={glow} scale={1.1}>
        <sphereGeometry args={[0.33, 64, 64]} />
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
      <mesh scale={1.5}>
        <sphereGeometry args={[0.33, 64, 64]} />
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
      <mesh scale={1.7}>
        <sphereGeometry args={[0.33, 64, 64]} />
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
      <mesh ref={glowOuter}>
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

useGLTF.preload(`${storageUrl}/planet/sun.glb`);

export default Sun;