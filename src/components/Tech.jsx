import React, { useState, useEffect } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

  // Limit simultaneous 3D canvases to 6 to stay safely below the browser's hard limit of 8-16 WebGL contexts
  // This completely eliminates "THREE.WebGLRenderer: Context Lost" errors while maintaining 3D interactivity
  const max3DCanvases = 6;

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology, index) => {
        const use3DBall = !isMobile && index < max3DCanvases;

        return (
          <div className='w-28 h-28 flex items-center justify-center' key={technology.name}>
            {use3DBall ? (
              <BallCanvas icon={technology.icon} />
            ) : (
              <div 
                className='w-20 h-20 rounded-full bg-tertiary flex items-center justify-center shadow-card hover:scale-110 hover:shadow-indigo-500/20 transition-all duration-300 border-2 border-indigo-500/10 glass-effect cursor-pointer group'
                title={technology.name}
              >
                <img 
                  src={technology.icon} 
                  alt={technology.name} 
                  className='w-12 h-12 object-contain select-none transition-transform group-hover:scale-110' 
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectionWrapper(Tech, "");
