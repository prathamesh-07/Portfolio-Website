import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

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

const isWebGLAvailable = () => {
  if (typeof window === "undefined") return false;
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

const Computers = ({ isPortrait }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");

  // Fix NaNs in geometry safely inside useEffect once upon loading
  useEffect(() => {
    if (computer?.scene) {
      computer.scene.traverse((child) => {
        if (child.isMesh && child.geometry) {
          try {
            if (child.geometry.attributes?.position) {
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
                } catch (e) {
                  // Silently bypass recomputation failure
                }
              }
            }
          } catch (e) {
            // Bypass geometry traversal error
          }
        }
      });
    }
  }, [computer]);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={512}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isPortrait ? 0.52 : 0.64}
        position={isPortrait ? [0, -3.3, -1.8] : [0, -3.4, -1.4]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const Controls = () => {
  const controlsRef = React.useRef();

  React.useEffect(() => {
    if (controlsRef.current?.domElement) {
      controlsRef.current.domElement.style.touchAction = "pan-y";
    }
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      enableDamping
      dampingFactor={0.25}
      touches={{ ONE: null, TWO: 0 }}
    />
  );
};

const ComputersCanvas = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [hasContextLost, setHasContextLost] = useState(false);
  const rendererRef = React.useRef(null);

  // When switching back to tab/browser, trigger a redraw event so 3D scene renders immediately
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setHasContextLost(false);
        // Dispatch synthetic resize so Three.js camera & controls refresh cleanly
        window.dispatchEvent(new Event("resize"));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      if (typeof window === "undefined") return;
      // Allow rendering on desktop screens OR mobile devices in "Desktop site" mode (innerWidth >= 640px)
      const hasWidth = window.innerWidth >= 640;
      const webgl = isWebGLAvailable();
      const portrait = window.innerHeight > window.innerWidth;

      setIsPortrait(portrait);
      setShouldRender(hasWidth && webgl);
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);
    window.addEventListener("orientationchange", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("orientationchange", updateLayout);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <CanvasErrorBoundary>
      <Canvas
        frameloop='demand'
        shadows
        dpr={[1, 1.25]}
        camera={{ position: [20, 3, 5], fov: isPortrait ? 35 : 25 }}
        style={{ touchAction: "pan-y", zIndex: 0 }}
        gl={{ 
          preserveDrawingBuffer: typeof window !== "undefined" && window.location.search.includes("capture=true"),
          antialias: true,
          alpha: true,
          powerPreference: "default"
        }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
          gl.setClearColor(0x000000, 0);
          gl.domElement.style.touchAction = "pan-y";
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setHasContextLost(true);
            },
            false
          );
          gl.domElement.addEventListener(
            "webglcontextrestored",
            () => {
              setHasContextLost(false);
            },
            false
          );
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Controls />
          <Computers isPortrait={isPortrait} />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
};

export default ComputersCanvas;