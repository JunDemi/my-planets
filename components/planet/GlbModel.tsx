import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';

interface GlbModelProps {
  modelPath: string;
  active: boolean;
}

const GlbModel = ({ modelPath, active }: GlbModelProps) => {
  const { scene } = useGLTF(modelPath);
  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      child.material = Array.isArray(child.material)
        ? child.material.map((material) => material.clone())
        : child.material.clone();
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (!(material instanceof MeshStandardMaterial)) return;

        material.emissiveIntensity = active ? 1.2 : 0.75;
        material.needsUpdate = true;
      });
    });
  }, [model, active]);

  return (
    <Center>
      <primitive object={model} dispose={null} />
    </Center>
  );
};

export const preloadGlbModels = (modelPaths: readonly string[]) => {
  modelPaths.forEach((modelPath) => useGLTF.preload(modelPath));
};

export default GlbModel;
