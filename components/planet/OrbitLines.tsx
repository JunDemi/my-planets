const OrbitLines = () => {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {[3.8, 5.8, 7.8].map((radius) => (
        <mesh key={radius}>
          <torusGeometry args={[radius, 0.006, 4, 160]} />
          <meshBasicMaterial color='#8fd3ff' transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
};

export default OrbitLines;
