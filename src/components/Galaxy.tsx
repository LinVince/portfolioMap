import React, { useEffect, useRef } from "react";
import * as Three from "three";
import { Button } from "@mui/material";

const ThreeJSPage: React.FC = () => {
  const sphereContainerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: Three.Scene;
    let camera: Three.PerspectiveCamera;
    let renderer: Three.WebGLRenderer;
    let sphere: Three.Mesh;

    const initThree = () => {
      // Scene setup
      scene = new Three.Scene();
      scene.background = new Three.Color(0xeeeeee);

      // Camera setup
      camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer setup
      renderer = new Three.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (sphereContainerRef.current) {
        sphereContainerRef.current.appendChild(renderer.domElement);
      }

      // Sphere setup
      const geometry = new Three.SphereGeometry(1, 32, 32);
      const material = new Three.MeshStandardMaterial({ color: 0xff0000 });
      sphere = new Three.Mesh(geometry, material);
      scene.add(sphere);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        if (sphereContainerRef.current) {
          sphereContainerRef.current.removeChild(renderer.domElement);
        }
      };
    };

    initThree();

    return () => {
      scene = undefined!;
      camera = undefined!;
      renderer = undefined!;
      sphere = undefined!;
    };
  }, []);

  const handleButtonClick = () => {
    if (orbitRef.current) {
      orbitRef.current.style.animation = "orbit 5s linear infinite";
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        ref={sphereContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        ref={orbitRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button variant="contained" onClick={handleButtonClick}>
          Orbit Button
        </Button>
      </div>
    </div>
  );
};

export default ThreeJSPage;
