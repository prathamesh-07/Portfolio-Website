import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Fix NaNs in geometry synchronously right after loading (before rendering)
  // This prevents Preload or other components from running into NaN values
  if (computer && computer.scene) {
    computer.scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        try {
          if (child.geometry.attributes.position) {
            const positions = child.geometry.attributes.position.array;
            let hasNaN = false;
            for (let i = 0; i < positions.length; i++) {
              if (isNaN(positions[i])) {
                hasNaN = true;
                positions[i] = 0;
              }
            }
            if (hasNaN) {
              child.geometry.attributes.position.needsUpdate = true;
              try {
                child.geometry.computeBoundingSphere();
                child.geometry.computeBoundingBox();
              } catch (err) {
                console.warn(`Error re-computing bounds for ${child.name}:`, err);
              }
            }
          }
        } catch (error) {
          console.error(`Error processing geometry for ${child.name}:`, error);
        }
      }
    });
  }

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    // Use 768px as standard mobile breakpoint to protect mobile devices from heavy 3D rendering
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Return null on mobile devices to prevent downloading/rendering the heavy 14MB 3D model
  if (isMobile) {
    return null;
  }

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.25}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;