import { useBox } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useStore } from "./store";

const DEBUG = false;

export function Checkpoint({ index, position }) {
  const checkpointRef = useRef(null);
  const args = [1, 1, 1];
  const [body] = useBox(
    () => ({
      args,
      position,
      isTrigger: true,
      type: "Static",
    }),
    checkpointRef
  );

  return (
    <>
      {DEBUG && (
        <mesh ref={body} position={position}>
          <boxGeometry args={args} />
          <meshBasicMaterial
            color={index === 0 ? "green" : "orange"}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      )}
    </>
  );
}
