import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "./useControls";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import CarAudio from "./CarAudio";
import { useStore } from "./store";

export function Car({ thirdPerson }) {
  // thanks to the_86_guy!
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861
  let result = useLoader(GLTFLoader, "/models/car.glb").scene;

  const position = [-5.5, 0.5, 0];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 300,
      position,
      rotation: [0, -Math.PI / 2, 0],
      userData: { type: "car" },
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  const controls = useControls(vehicleApi, chassisApi);

  // Track car speed for audio
  const [carSpeed, setCarSpeed] = useState(0);
  const setSpeed = useStore((state) => state.setSpeed);

  // Track camera look offset for Q/E keys
  const [lookOffset, setLookOffset] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "q" || e.key === "Q") {
        setLookOffset(3); // Look left
      } else if (e.key === "e" || e.key === "E") {
        setLookOffset(-3); // Look right
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "q" || e.key === "Q" || e.key === "e" || e.key === "E") {
        setLookOffset(0); // Return to center
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Checkpoint positions
  const checkpoints = [
    [-3.95, 0, -0.2], // 0: Start/Finish
    [8.8, 0, -0.2], // 1
    [14.4, 0, -6.2], // 2
    [7, 0, -16.55], // 3
    [10.5, 0, -11.55], // 4
    [9, 0, -4.25], // 5
    [0.17, 0, -12.25], // 6
    [4, 0, -16.25], // 7
  ];

  const {
    currentCheckpoint,
    lapCount,
    currentLapTime,
    lastLapTime,
    bestLapTime,
    gameStarted,
    setCurrentCheckpoint,
    startLapTimer,
    updateLapTime,
    completeLap,
  } = useStore();

  // Check proximity to checkpoint
  const checkpointHitRef = useRef(false);
  const readyForLapCompletionRef = useRef(false);

  useEffect(() => {
    checkpointHitRef.current = false; // Reset when checkpoint changes
  }, [currentCheckpoint]);

  useFrame((state) => {
    if (!chassisBody.current) return;

    // Only process checkpoints if game has started
    if (!gameStarted) return;

    // Checkpoint detection (runs every frame)
    const carPos = new Vector3().setFromMatrixPosition(
      chassisBody.current.matrixWorld
    );
    const checkpointPos = new Vector3(...checkpoints[currentCheckpoint]);
    const distance = carPos.distanceTo(checkpointPos);

    // Debug: Show distance to current checkpoint
    if (distance < 3) {
      console.log(
        `[CHECKPOINT DEBUG] Car distance to CP${currentCheckpoint}: ${distance.toFixed(
          2
        )}`
      );
    }

    if (distance < 0.75 && !checkpointHitRef.current) {
      checkpointHitRef.current = true; // Mark this checkpoint as hit
      const storeState = useStore.getState();
      const lapLimit = storeState.getLapLimit();
      console.log(`✅ HIT CHECKPOINT ${currentCheckpoint}`);
      // Hit checkpoint in order
      if (currentCheckpoint === 0) {
        // Start/Finish - check if ready for lap completion
        if (readyForLapCompletionRef.current) {
          // Check if we've reached lap limit
          if (storeState.lapCount >= lapLimit) {
            console.log(`🏁🏁 RACE FINISHED! Final Lap Count: ${lapLimit}`);
            readyForLapCompletionRef.current = false;
          } else {
            // Completed a lap (not at limit yet)
            const lapTime =
              (performance.now() - storeState.lapStartTime) / 1000;
            console.log(
              `🏁 LAP COMPLETED! Time: ${lapTime.toFixed(2)}s | Lap Count: ${
                storeState.lapCount + 1
              }`
            );
            completeLap(lapTime);
            startLapTimer();
            readyForLapCompletionRef.current = false;
          }
        } else {
          // First time crossing start
          console.log(`🚗 RACE STARTED! Beginning Lap 1`);
          startLapTimer();
          setCurrentCheckpoint(1);
        }
      } else if (currentCheckpoint === 7) {
        // Last checkpoint, next is Start/Finish
        console.log(`→ CP7 passed, heading to Start/Finish`);
        readyForLapCompletionRef.current = true; // Mark that next CP0 completes a lap
        setCurrentCheckpoint(0);
      } else {
        // Normal checkpoint progression
        console.log(
          `→ CP${currentCheckpoint} passed, next: CP${currentCheckpoint + 1}`
        );
        setCurrentCheckpoint(currentCheckpoint + 1);
      }
    }

    // Update lap time (every frame)
    if (useStore.getState().lapStartTime) {
      const elapsed =
        (performance.now() - useStore.getState().lapStartTime) / 1000;
      updateLapTime(elapsed);
    }

    if (!thirdPerson) return;

    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0, 0, 1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    // Apply look offset for Q/E keys
    let sideDir = new Vector3(10, 0, 0);
    sideDir.applyQuaternion(quaternion);
    sideDir.normalize();

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)))
      .add(sideDir.clone().multiplyScalar(lookOffset * 0.5));

    let lookAtPosition = position
      .clone()
      .add(sideDir.clone().multiplyScalar(-lookOffset * 0.01));

    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(lookAtPosition);

    // Calculate speed from chassis velocity for audio
    if (chassisApi.velocity) {
      chassisApi.velocity.subscribe((velocity) => {
        const speed = Math.sqrt(
          velocity[0] ** 2 + velocity[1] ** 2 + velocity[2] ** 2
        );
        setCarSpeed(speed);
        setSpeed(speed);
      });
    }
  });

  useEffect(() => {
    if (!result) return;

    let mesh = result;
    mesh.scale.set(0.0012, 0.0012, 0.0012);

    mesh.children[0].position.set(-365, -18, -67);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={result}
          rotation-y={Math.PI}
          position={[0, -0.09, 0]}
        />
      </group>

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
      <CarAudio controls={controls} speed={carSpeed} />
    </group>
  );
}
