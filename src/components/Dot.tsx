import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Dots: React.FC = () => {
  const dotCount = 1000;
  const dotsRef = useRef<THREE.InstancedMesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const dummy = new THREE.Object3D();

  useFrame(() => {
    if (dotsRef.current) {
      for (let i = 0; i < dotCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / dotCount);
        const theta = Math.sqrt(dotCount * Math.PI) * phi;

        dummy.position.setFromSphericalCoords(1, phi, theta);
        dummy.position.multiplyScalar(2 + Math.random() * 1);

        const target = new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0);
        dummy.position.lerp(target, 0.02); // Adjust this value to control the speed
        dummy.updateMatrix();

        dotsRef.current.setMatrixAt(i, dummy.matrix);
      }
      dotsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={dotsRef} args={[undefined, undefined, dotCount]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#ff0000" />
    </instancedMesh>
  );
};

export default Dots;
