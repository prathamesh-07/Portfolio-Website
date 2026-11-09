import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    // 5001 is a multiple of 3 (1667 vertices * 3 coordinates).
    // Using 5000 left the last 2 floats unhandled, causing NaN bounding spheres in Three.js.
    const points = new Float32Array(5001);
    random.inSphere(points, { radius: 1.2 });
    // Sanitize any potential NaN values from random generator
    for (let i = 0; i < points.length; i++) {
      if (isNaN(points[i])) {
        points[i] = 0;
      }
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Set frustumCulled={false} to prevent repeated bounding sphere recomputation */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1] pointer-events-none'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ preserveDrawingBuffer: false, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
            },
            false
          );
        }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
