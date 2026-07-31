'use client';

import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { destinations } from '@/config/portfolio-data';
import Universe from './planet/Universe';
import { preloadGlbModels } from './planet/GlbModel';
import SpaceSparkles from './SpaceSparkle';
import SuspenceContainer from './SuspenceContainer';

export interface BasicThreeSceneProps {
  activeIndex: number | null;
  onSelect: (index: number) => void;
}

const BasicThreeScene = ({ activeIndex, onSelect }: BasicThreeSceneProps) => {
  const sparkles = [
    { color: '#fff', speed: 0.14, opacity: 1 },
    { color: '#fff719', speed: 0.08, opacity: 1 },
    { color: '#8fb6ff', speed: 0.21, opacity: 1 },
  ];

  useEffect(() => {
    const modelPaths = [...new Set(destinations.map((destination) => destination.modelPath))];
    preloadGlbModels(modelPaths);
  }, []);

  return (
    <div className='fixed inset-0 z-0 bg-surface-scene'>
      <Canvas
        camera={{ position: [0, 0, 15.5], fov: 48, near: 0.1, far: 90 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
        style={{ touchAction: 'none' }}
      >
        <color attach='background' args={['#000000']} />
        <fog attach='fog' args={['#000000', 18, 58]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 8]} intensity={2} color='#dbeafe' />
        <pointLight position={[-5, -3, 6]} intensity={22} color='#4cc9f0' distance={24} />
        <Stars radius={48} depth={65} count={3200} factor={3.2} saturation={0.25} fade speed={0.25} />
        {sparkles.map((sparkle, i) => (
          <SpaceSparkles key={i} color={sparkle.color} speed={sparkle.speed} opacity={sparkle.opacity} />
        ))}
        <SuspenceContainer>
          <Universe activeIndex={activeIndex} onSelect={onSelect} />
        </SuspenceContainer>
      </Canvas>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,0.08)_45%,rgba(5,8,22,0.78)_100%)]' />
    </div>
  );
};

export default BasicThreeScene;
