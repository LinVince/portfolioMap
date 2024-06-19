import React, { useEffect, useRef } from "react";
import * as Three from "three";
import useDarkModeStore from "../store";
import { darkThemeOptions, lightThemeOptions } from "../theme";
import { useMediaQuery, Box, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom"; // Import useHistory hook from React Router

const ThreeJSPage: React.FC = () => {
  const sphereContainerRef = useRef<HTMLDivElement>(null);
  const planeContainerRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useDarkModeStore((state: any) => ({
    darkMode: state.darkMode,
  }));
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;

  useEffect(() => {
    // Function to initialize each scene and object
    const initScene = (container: HTMLDivElement, object: Three.Object3D) => {
      if (container) {
        const scene = new Three.Scene();
        scene.background = new Three.Color(theme.palette.background.default);

        const camera = new Three.PerspectiveCamera(
          75,
          container.offsetWidth / container.offsetHeight,
          0.1,
          1000
        );
        camera.position.z = 5;

        const renderer = new Three.WebGLRenderer();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        // Adjust object position based on container
        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0;
        scene.add(object);

        const animate = () => {
          requestAnimationFrame(animate);
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
          // Update camera aspect ratio and renderer size on window resize
          camera.aspect = container.offsetWidth / container.offsetHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.offsetWidth, container.offsetHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          container.removeChild(renderer.domElement);
        };
      }
    };

    // Initialize sphere scene
    if (sphereContainerRef.current) {
      const sphereGeometry = new Three.SphereGeometry(1, 10, 10);
      const sphereWireframe = new Three.WireframeGeometry(sphereGeometry);
      const sphereMaterial = new Three.LineBasicMaterial({
        color: theme.palette.text.secondary,
      });
      const sphere = new Three.LineSegments(sphereWireframe, sphereMaterial);
      initScene(sphereContainerRef.current, sphere);
    }

    // Initialize plane scene
    if (planeContainerRef.current) {
      const planeGeometry = new Three.PlaneGeometry(1, 1);
      const planeWireframe = new Three.WireframeGeometry(planeGeometry);
      const planeMaterial = new Three.LineBasicMaterial({
        color: theme.palette.text.secondary,
      });
      const plane = new Three.LineSegments(planeWireframe, planeMaterial);
      initScene(planeContainerRef.current, plane);
    }

    // Clean up
    return () => {
      // Clean up sphere container
      if (sphereContainerRef.current) {
        while (sphereContainerRef.current.firstChild) {
          sphereContainerRef.current.removeChild(
            sphereContainerRef.current.firstChild
          );
        }
      }
      // Clean up plane container
      if (planeContainerRef.current) {
        while (planeContainerRef.current.firstChild) {
          planeContainerRef.current.removeChild(
            planeContainerRef.current.firstChild
          );
        }
      }
    };
  }, [darkMode]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        flexWrap: "wrap",
      }}
    >
      {/* Sphere container */}
      <Box
        sx={{
          width: isMobile ? "300px" : "50%", // Adjust width as needed
          height: "100%", // Take full height of parent container
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          ref={sphereContainerRef}
          sx={{
            width: "100%", // Adjust width as needed
            height: "100%", // Take full height of parent container
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Link to="/portfolioMap" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              paddingX: 2,
              marginX: 1,
              width: "fit-content",
              borderRadius: "30px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            Portfolio Map
          </Button>
        </Link>
      </Box>

      {/* Plane container */}
      <Box
        sx={{
          width: isMobile ? "300px" : "50%", // Adjust width as needed
          height: "100%", // Take full height of parent container
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          ref={planeContainerRef}
          sx={{
            width: "100%", // Adjust width as needed
            height: "100%", // Take full height of parent container
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Button
          sx={{
            paddingX: 2,
            marginX: 1,
            width: "fit-content",
            borderRadius: "30px",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          Portfolio Gallery Coming Soon
        </Button>
      </Box>
    </Box>
  );
};

export default ThreeJSPage;
