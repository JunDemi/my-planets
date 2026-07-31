export const ORBIT_Y_SCALE = 1;
export const ORBIT_TILT = -1.25;

interface OrbitParameters {
  orbitRadius: number;
  initialAngle: number;
  orbitSpeed: number;
}

export const getOrbitPosition = (orbit: OrbitParameters, elapsedTime: number, phaseOffset = 0) => {
  const angle = orbit.initialAngle + elapsedTime * (orbit.orbitSpeed / 6.6) + phaseOffset;
  const localX = Math.cos(angle) * orbit.orbitRadius;
  const localY = Math.sin(angle) * orbit.orbitRadius * ORBIT_Y_SCALE;

  const y = localY * Math.cos(ORBIT_TILT);
  const z = localY * Math.sin(ORBIT_TILT);

  return [localX, y, z] as const;
};
