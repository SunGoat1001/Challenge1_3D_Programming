import { useBox } from "@react-three/cannon";

const debug = false;

export function ColliderBox({
  position,
  scale,
  rotation = [0, 0, 0],
  color = "yellow",
}) {
  useBox(() => ({
    args: scale,
    position,
    rotation,
    type: "Static",
  }));

  return (
    debug && (
      <mesh position={position} rotation={rotation}>
        <boxGeometry args={scale} />
        <meshBasicMaterial
          color={color}
          // transparent={true}
          // opacity={0.25}
        />
      </mesh>
    )
  );
}
