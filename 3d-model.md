📌 외부 3D 모델 적용 - 최종 요약

🎯 4단계 수정 프로세스

1️⃣ 데이터 정의 추가 (config/portfolio-data.ts)

```
export const destinations = [
  {
    id: 'about',
    modelPath: '/models/about-planet.glb',  // ✨ 추가
    // ... 나머지 속성
  },
  // 7개 행성 모두에 modelPath 추가
];
```

2️⃣ 모델 로더 컴포넌트 생성 (components/planet/PlanetModel.tsx)

```
import { useGLTF } from '@react-three/drei';

export const PlanetModel = ({ modelPath, color, active, index }: PlanetModelProps) => {
  const { scene } = useGLTF(modelPath);  // ← GLB/GLTF 파일 로드
  
  useEffect(() => {
    // 모든 메시에 색상 & 이미션 적용
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.color = new Color(color);
        child.material.emissiveIntensity = active ? 1.2 : 0.75;
      }
    });
  }, [scene, color, active]);
  
  return <group ref={modelRef} />;
};
```

3️⃣ Planet.tsx 수정

```
// ❌ 이전 (icosahedron)
<mesh>
  <icosahedronGeometry args={[1, 4]} />
  <meshStandardMaterial color={destination.color} />
</mesh>

// ✅ 이후 (외부 모델)
<PlanetModel
  modelPath={destination.modelPath}
  color={destination.color}
  active={active}
  index={index}
/>
```

4️⃣ 모델 프리로드 (BasicThreeScene.tsx)

```
useEffect(() => {
  const modelPaths = destinations
    .map((d) => d.modelPath)
    .filter((p): p is string => Boolean(p));
  
  preloadPlanetModels(modelPaths);  // ← 클릭 시 지연 방지
}, []);
```

────────────────────

📂 파일 배치

public/models/
├── about-planet.glb
├── career-planet.glb
├── skills-planet.glb
├── projects-planet.glb
├── architecture-planet.glb
├── gallery-planet.glb
└── contact-planet.glb

────────────────────

💡 핵심 개념

┌───────────────────┬─────────────────────────────────────┐
│ 개념              │ 설명                                │
├───────────────────┼─────────────────────────────────────┤
│ useGLTF           │ React Three Fiber의 3D 모델 로더 훅 │
├───────────────────┼─────────────────────────────────────┤
│ scene.clone()     │ 모델 인스턴싱 (메모리 재사용)       │
├───────────────────┼─────────────────────────────────────┤
│ traverse()        │ 모델의 모든 메시 순회 & 재질 적용   │
├───────────────────┼─────────────────────────────────────┤
│ protoload()       │ 사전 로드로 클릭 지연 제거          │
├───────────────────┼─────────────────────────────────────┤
│ emissiveIntensity │ 클릭 시 행성 강조 효과              │
└───────────────────┴─────────────────────────────────────┘

────────────────────

✅ 기존 기능 유지

┌─────────────────────┬───────────────┐
│ 기능                │ 상태          │
├─────────────────────┼───────────────┤
│ 회전 애니메이션     │ ✓ 그대로 동작 │
├─────────────────────┼───────────────┤
│ 스케일 변화 (2.1배) │ ✓ 그대로 동작 │
├─────────────────────┼───────────────┤
│ 클릭 감지           │ ✓ 그대로 동작 │
├─────────────────────┼───────────────┤
│ 드래그 회전         │ ✓ 그대로 동작 │
├─────────────────────┼───────────────┤
│ 카메라 포커싱       │ ✓ 그대로 동작 │
├─────────────────────┼───────────────┤
│ 테두리 링           │ ✓ 그대로 동작 │
├─────────────────────┼───────────────┤
│ 패널 열림           │ ✓ 그대로 동작 │
└─────────────────────┴───────────────┘

────────────────────

⚡ 성능 팁

✅ 각 모델 < 500KB 유지
✅ 프리로드 활용 (초기 로딩)
✅ Draco 압축 사용 (선택사항)
✅ 메시 개수 최적화 (폴리곤 감소)