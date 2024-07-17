import React from "react";
import { Canvas } from "@react-three/fiber";
import Dots from "../components/Dot";

const Dot: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Dots />
      </Canvas>
    </div>
  );
};

export default Dot;
