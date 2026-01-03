import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/cannon";
import { Scene } from "./Scene";
import { HUD } from "./HUD";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2, 0]}>
        {/* <Debug color="black" scale={1.1}>
          <Scene />
        </Debug> */}
        <Scene />
      </Physics>
    </Canvas>

    <HUD />

    <div className="controls">
      <p>press w a s d to move</p>
      <p>press e to look right</p>
      <p>press q to look left</p>
      <p>press arrows for flips</p>
    </div>
  </StrictMode>
);
