import { useSphere } from "@react-three/cannon";

const debug = false;

export function ColliderSphere({ radius, position, color = "yellow" }) {
  const args = [radius];
  useSphere(() => ({
    args,
    position,
    type: "Static",
  }));

  return (
    debug && (
      <mesh position={position}>
        <sphereGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  );
}
