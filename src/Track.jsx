import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ColliderBox } from "./ColliderBox";
import * as THREE from "three";
import { ColliderSphere } from "./ColliberSphere";
import { Checkpoint } from "./Checkpoint";

export function Track() {
  const result = useLoader(GLTFLoader, "/models/drift_tracks.glb");

  const colorMap = useLoader(TextureLoader, "/textures/track.png");

  useEffect(() => {
    colorMap.anisotropy = 16;
  }, [colorMap]);

  let geometry = result.scene.children[0].geometry;
  result.scene.scale.set(0.1, 0.1, 0.1);

  return (
    <>
      {/* <mesh geometry={geometry}>
        <meshBasicMaterial
          toneMapped={false}
          map={colorMap}
        />
      </mesh> */}
      <primitive object={result.scene}></primitive>
      <>
        <ColliderSphere
          radius={0.7}
          position={[9.15, 0.22, -5.62]}
          color={"blue"}
        />
        <ColliderBox
          position={[-0.95, 0, 0.51]}
          scale={[25, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(0.2), 0]}
        />
        <ColliderBox
          position={[12, 0, 0.23]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(15), 0]}
          color="red"
        />
        <ColliderBox
          position={[13, 0, -0.21]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(32), 0]}
          color="yellow"
        />
        <ColliderBox
          position={[13.78, 0, -0.85]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(45), 0]}
          color="red"
        />
        <ColliderBox
          position={[14.28, 0, -1.48]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(58), 0]}
          color="yellow"
        />
        <ColliderBox
          position={[14.72, 0, -2.29]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(67), 0]}
          color="red"
        />
        <ColliderBox
          position={[15.03, 0, -3.22]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(75), 0]}
          color="yellow"
        />
        <ColliderBox
          position={[15.23, 0, -4.22]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(82), 0]}
          color="blue"
        />
        <ColliderBox
          position={[14.95, 0, -14.62]}
          scale={[1.3, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(105), 0]}
          color="blue"
        />
        <ColliderBox
          position={[14.55, 0, -15.62]}
          scale={[1.3, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(120), 0]}
          color="purple"
        />
        <ColliderBox
          position={[13.6, 0, -16.85]}
          scale={[1.3, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(134), 0]}
          color="red"
        />
        <ColliderBox
          position={[12.75, 0, -17.6]}
          scale={[1.3, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(146), 0]}
          color="blue"
        />
        <ColliderBox
          position={[7.9, 0, -13.75]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-22), 0]}
          color="purple"
        />
        <ColliderBox
          position={[8.7, 0, -13.5]}
          scale={[1.3, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-15), 0]}
          color="blue"
        />
        <ColliderSphere
          radius={0.44}
          position={[9.3, 0.22, -12.9]}
          color={"blue"}
        />

        {/* long wall */}
        <ColliderBox
          position={[15.28, 0, -8.95]}
          scale={[14, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(92), 0]}
          color="red"
        />

        <ColliderBox
          position={[-13, 0, 0.43]}
          scale={[0.5, 1, 0.03]}
          rotation={[0, -Math.PI / 8.5, 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-14, 0, -0.1]}
          scale={[2, 1, 0.03]}
          rotation={[0, -Math.PI / 6, 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-14.6, 0, -0.8]}
          scale={[1, 1, 0.03]}
          rotation={[0, -Math.PI / 3.2, 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-14.8, 0, -1.2]}
          scale={[2, 1, 0.03]}
          rotation={[0, -THREE.MathUtils.degToRad(72), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-14.2, 0, -4]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(45), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-15, 0, -2.5]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(84), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-13, 0, -4.8]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(200), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-5.6, 0, -4.9]}
          scale={[15.2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(180), 0]}
          color={"yellow"}
        />
        <ColliderSphere
          radius={0.7}
          position={[2.15, 0.22, -5.62]}
          color={"blue"}
        />
        <ColliderBox
          position={[-5.6, 0, -6.32]}
          scale={[15.2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(180), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-1.8, 0, -6.55]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(160), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-2.78, 0, -7]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(144), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-3.6, 0, -7.8]}
          scale={[1.25, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(130), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-4.1, 0, -8.6]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(112), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-4.4, 0, -10.1]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(97), 0]}
          color={"red"}
        />
        <ColliderSphere
          radius={0.83}
          position={[-5.4, 0.22, -11.22]}
          color={"blue"}
        />
        <ColliderBox
          position={[-5.2, 0, -12.25]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(132), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-6, 0, -12.9]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(150), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-6.9, 0, -13.25]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(164), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-8, 0, -13.4]}
          scale={[1.2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(180), 0]}
          color={"yellow"}
        />
        <ColliderSphere
          radius={0.7}
          position={[-8.7, 0.22, -12.68]}
          color={"blue"}
        />
        <ColliderBox
          position={[-7.9, 0, -11.92]}
          scale={[1.2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(170), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-6.9, 0, -11.6]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(155), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-6.4, 0, -11.2]}
          scale={[1.2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(140), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-5.7, 0, -10]}
          scale={[1.2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(110), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-5.65, 0, -9.3]}
          scale={[1.1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(90), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-5.8, 0, -8.3]}
          scale={[1.1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(75), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-6.25, 0, -7.4]}
          scale={[1.1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(55), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-7.1, 0, -6.7]}
          scale={[1.5, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(30), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-10.6, 0, -6.6]}
          scale={[2.4, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-15), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-12.4, 0, -7.6]}
          scale={[2.4, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-40), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-13.55, 0, -8.7]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-55), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-14.4, 0, -10.4]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-72), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-14.7, 0, -12]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-85), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-14.7, 0, -13]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-95), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-14.35, 0, -14.75]}
          scale={[2, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-110), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-13.35, 0, -16.5]}
          scale={[2.5, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-128), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-12, 0, -17.8]}
          scale={[2.5, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-145), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[-10.2, 0, -18.85]}
          scale={[2.5, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-155), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[-4.5, 0, -19.5]}
          scale={[9.5, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-178), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[0, 0, -19.4]}
          scale={[4.5, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-185), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[2.7, 0, -18.99]}
          scale={[1.4, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-200), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[3.63, 0, -18.5]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-215), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[4.24, 0, -17.96]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-233), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[4.64, 0, -17.23]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-245), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[4.84, 0, -16.63]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-265), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[4.84, 0, -15.7]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-275), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[4.52, 0, -14.83]}
          scale={[1.4, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-300), 0]}
          color={"yellow"}
        />
        <ColliderBox
          position={[3.8, 0, -13.96]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-320), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[3.28, 0, -13.63]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-340), 0]}
          color={"yellow"}
        />
        <ColliderSphere
          radius={0.5}
          position={[1.34, 0.22, -12.4]}
          color={"blue"}
        />
        <ColliderBox
          position={[2.4, 0, -13.37]}
          scale={[1, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-346), 0]}
          color={"red"}
        />
        <ColliderBox
          position={[1.54, 0, -13.07]}
          scale={[0.8, 1, 0.03]}
          rotation={[0, THREE.MathUtils.degToRad(-335), 0]}
          color={"yellow"}
        />
      </>
      {/* Checkpoints */}
      <Checkpoint index={0} position={[-3.95, 0.6, -0.2]} />{" "}
      {/* Start/Finish */}
      <Checkpoint index={1} position={[8.8, 0.6, -0.2]} />
      <Checkpoint index={2} position={[14.4, 0.6, -6.2]} />
      <Checkpoint index={3} position={[7, 0.6, -16.55]} />
      <Checkpoint index={4} position={[10.5, 0.6, -11.55]} />
      <Checkpoint index={5} position={[9, 0.6, -4.25]} />
      <Checkpoint index={6} position={[0.17, 0.6, -12.25]} />
      <Checkpoint index={7} position={[4, 0.6, -16.25]} />
    </>
  );
}
