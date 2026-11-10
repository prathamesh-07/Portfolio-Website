import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("ComputersCanvas 3D rendering gracefully skipped:", error?.message || error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const isMobileOrTouch = () => {
  if (typeof window === "undefined") return false;

  // 1. Viewport width check
  if (window.innerWidth <= 768) return true;

  // 2. Mobile / tablet user agent detection (catches mobile browsers running in "Desktop site" mode)
  const ua = navigator.userAgent || navigator.vendor || window.opera || "";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
    return true;
  }

  // 3. Touch device with coarse pointer (phones / tablets in desktop mode)
  const hasTouch = (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) || ("ontouchstart" in window);
  const isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if (hasTouch && isCoarse) {
    return true;
  }

  return false;
};

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Fix NaNs in geometry synchronously right after loading (before rendering)
  // This prevents Preload or other components from running into NaN values
  if (computer && computer.scene) {
    computer.scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        try {
          if (child.geometry.attributes && child.geometry.attributes.position) {
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
                child.geometry.computeBoundingBox();
                child.geometry.computeBoundingSphere();
              } catch (err) {
                // Silently bypass recomputation failure
              }
            }
          }
        } catch (error) {
          // Bypass geometry traversal error
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
  const [shouldRender, setShouldRender] = useState(false);
  const [hasContextLost, setHasContextLost] = useState(false);

  useEffect(() => {
    const checkEligibility = () => {
      const mobile = isMobileOrTouch();
      const webgl = isWebGLAvailable();
      setShouldRender(!mobile && webgl);
    };

    checkEligibility();

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => checkEligibility();

    mediaQuery.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!shouldRender || hasContextLost) {
    return null;
  }

  return (
    <CanvasErrorBoundary>
      <Canvas
        frameloop='demand'
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ 
          preserveDrawingBuffer: false,
          antialias: true,
          alpha: true,
          powerPreference: "default"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setHasContextLost(true);
            },
            false
          );
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
          <Computers isMobile={false} />
        </Suspense>

        <Preload all />
      </Canvas>
    </CanvasErrorBoundary>
  );
};

export default ComputersCanvas;