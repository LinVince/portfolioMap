import React, { useEffect, useRef } from "react";
import * as Three from "three";
import { useSelector } from "react-redux";
import { darkThemeOptions, lightThemeOptions } from "../theme";
import { useMediaQuery, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ScrollDownIcon from "./ScrollDownIcon";

const ThreeJSPage: React.FC = () => {
  const sphereContainerRef = useRef<HTMLDivElement>(null);
  const planeContainerRef = useRef<HTMLDivElement>(null);
  const cubeContainerRef = useRef<HTMLDivElement>(null);
  const triangleContainerRef = useRef<HTMLDivElement>(null);
  const highHatContainerRef = useRef<HTMLDivElement>(null);
  const darkMode = useSelector((state: any) => state.darkMode);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;
  const fontFamily = "Orbitron, sans-serif";
  const fontSize = isMobile ? "20px" : "32px";

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
        camera.position.z = 3;

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
    // Initialize cube scene
    if (cubeContainerRef.current) {
      const cubeGeometry = new Three.BoxGeometry(1, 1, 1);
      const cubeWireframe = new Three.WireframeGeometry(cubeGeometry);
      const cubeMaterial = new Three.LineBasicMaterial({
        color: theme.palette.text.secondary,
      });
      const cube = new Three.LineSegments(cubeWireframe, cubeMaterial);
      initScene(cubeContainerRef.current, cube);
    }

    // Initialize triangle scene
    if (triangleContainerRef.current) {
      const triangleGeometry = new Three.BufferGeometry();
      const vertices = new Float32Array([
        0,
        1,
        0, // Vertex 1
        -1,
        -1,
        0, // Vertex 2
        1,
        -1,
        0, // Vertex 3
      ]);

      triangleGeometry.setAttribute(
        "position",
        new Three.BufferAttribute(vertices, 3)
      );

      const triangleMaterial = new Three.LineBasicMaterial({
        color: theme.palette.text.secondary,
      });

      const triangle = new Three.LineSegments(
        new Three.WireframeGeometry(triangleGeometry),
        triangleMaterial
      );

      initScene(triangleContainerRef.current, triangle);
    }

    // Initialize high hat scene
    if (highHatContainerRef.current) {
      // Create the brim of the high hat
      const brimGeometry = new Three.CylinderGeometry(1, 1, 0.2, 10);
      const brimWireframe = new Three.WireframeGeometry(brimGeometry);
      const brimMaterial = new Three.LineBasicMaterial({
        color: theme.palette.text.secondary,
      });
      const brim = new Three.LineSegments(brimWireframe, brimMaterial);

      // Create the top part of the high hat
      const topGeometry = new Three.CylinderGeometry(0.5, 0.5, 1.5, 10);
      const topWireframe = new Three.WireframeGeometry(topGeometry);
      const topMaterial = new Three.LineBasicMaterial({
        color: theme.palette.text.secondary,
      });
      const top = new Three.LineSegments(topWireframe, topMaterial);
      top.position.y = 0.85; // Move the top part above the brim

      // Create a group to combine the brim and top part
      const highHat = new Three.Group();
      highHat.add(brim);
      highHat.add(top);

      initScene(highHatContainerRef.current, highHat);
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
      if (cubeContainerRef.current) {
        while (cubeContainerRef.current.firstChild) {
          cubeContainerRef.current.removeChild(
            cubeContainerRef.current.firstChild
          );
        }
      }
      if (triangleContainerRef.current) {
        while (triangleContainerRef.current.firstChild) {
          triangleContainerRef.current.removeChild(
            triangleContainerRef.current.firstChild
          );
        }
      }
      if (highHatContainerRef.current) {
        while (highHatContainerRef.current.firstChild) {
          highHatContainerRef.current.removeChild(
            highHatContainerRef.current.firstChild
          );
        }
      }
    };
  }, [darkMode, isMobile]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={400}
          fontFamily={fontFamily}
          fontStyle={{ color: "#CCC" }}
          fontSize={fontSize}
        >
          Projects
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Sphere container */}
        <Box
          sx={{
            flex: "1 1 300px",
            height: "600px",
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
              height: "60%", // Take full height of parent container
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
              By Region
            </Button>
          </Link>
        </Box>
        {/* Plane container */}
        <Box
          sx={{
            flex: "1 1 300px", // Adjust width as needed
            height: "600px", // Take full height of parent container
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
              height: "60%", // Take full height of parent container
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Link to="/portfolioGallery" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                paddingX: 2,
                marginX: 1,
                width: "fit-content",
                borderRadius: "30px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              By Project
            </Button>
          </Link>
        </Box>
      </Box>
      {/*Cube Container*/}
      {/* 

      <Box
        sx={{
          width: isMobile ? "300px" : "30%", // Adjust width as needed
          height: "100%", // Take full height of parent container
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          ref={cubeContainerRef}
          sx={{
            width: "100%", // Adjust width as needed
            height: "60%", // Take full height of parent container
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Link to="/Experience" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              paddingX: 2,
              marginX: 1,
              width: "fit-content",
              borderRadius: "30px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            Experience
          </Button>
        </Link>
      </Box>*/}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={400}
          fontFamily={fontFamily}
          fontStyle={{ color: "#CCC" }}
          fontSize={fontSize}
        >
          Data Journalism
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* High Hat container */}
        <Box
          sx={{
            flex: "1 1 300px", // Adjust width as needed
            height: "600px", // Take full height of parent container
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            ref={highHatContainerRef}
            sx={{
              width: "100%", // Adjust width as needed
              height: "60%", // Take full height of parent container
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Link to="/dataBreaches" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                paddingX: 2,
                marginX: 1,
                width: "fit-content",
                borderRadius: "30px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              Cybersecurity
            </Button>
          </Link>
        </Box>
        {/* Triangle container */}
        <Box
          sx={{
            flex: "1 1 300px", // Adjust width as needed
            height: "600px", // Take full height of parent container
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            ref={triangleContainerRef}
            sx={{
              width: "100%", // Adjust width as needed
              height: "60%", // Take full height of parent container
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Link to="/economy" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                paddingX: 2,
                marginX: 1,
                width: "fit-content",
                borderRadius: "30px",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              Economy
            </Button>
          </Link>
        </Box>
        {/* End of Triangle container */}
      </Box>
      <ScrollDownIcon />
    </>
  );
};

export default ThreeJSPage;
