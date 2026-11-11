import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { View, Preload, OrbitControls } from "@react-three/drei";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { Ball } from "./canvas/Ball";

const Tech = () => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const itemRefs = useRef(technologies.map(() => React.createRef()));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "250px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {inView && (
        <Canvas
          eventSource={containerRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 10,
          }}
          gl={{
            antialias: false,
            powerPreference: "low-power",
            alpha: true,
          }}
        >
          {technologies.map((tech, i) => (
            <View key={tech.name} track={itemRefs.current[i]}>
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} />
                <Ball imgUrl={tech.icon} />
              </Suspense>
            </View>
          ))}
          <Preload all />
        </Canvas>
      )}

      <div className="flex flex-row flex-wrap justify-center gap-10 relative">
        {technologies.map((technology, i) => (
          <div
            ref={itemRefs.current[i]}
            key={technology.name}
            className="w-28 h-28 flex items-center justify-center cursor-grab active:cursor-grabbing"
            title={technology.name}
            style={{ touchAction: "none" }}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
