'use client';

import { Sparkles, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Universe from './planet/Universe';

export interface BasicThreeSceneProps {
  activeIndex: number | null;
  onSelect: (index: number) => void;
}

const BasicThreeScene = ({ activeIndex, onSelect }: BasicThreeSceneProps) => {
  return (
    <div className='fixed inset-0 z-0 bg-surface-scene'>
      <Canvas
        camera={{ position: [0, 0, 15.5], fov: 48, near: 0.1, far: 90 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
        style={{ touchAction: 'none' }}
      >
        <color attach='background' args={['#050816']} />
        <fog attach='fog' args={['#050816', 18, 58]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 8]} intensity={2} color='#dbeafe' />
        <pointLight position={[-5, -3, 6]} intensity={22} color='#4cc9f0' distance={24} />
        <Stars radius={48} depth={65} count={3200} factor={3.2} saturation={0.25} fade speed={0.25} />
        <Sparkles count={80} scale={[18, 12, 8]} size={1.4} speed={0.14} opacity={0.45} color='#67e8f9' />
        <Universe activeIndex={activeIndex} onSelect={onSelect} />
      </Canvas>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,0.08)_45%,rgba(5,8,22,0.78)_100%)]' />
    </div>
  );
};

export default BasicThreeScene;