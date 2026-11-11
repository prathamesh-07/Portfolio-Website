import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./shared/ErrorBoundary";
import { useLoader } from "../context/LoaderContext";

const Hero = () => {
  const { appReady, heroKey, isLoading } = useLoader();
  const isHeroVisible = appReady || !isLoading;

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden z-0">
      <div
        key={heroKey}
        className="absolute inset-0 top-[135px] sm:top-[150px] lg:top-[160px] max-w-7xl mx-auto px-6 sm:px-16 flex flex-row items-start gap-5 z-10 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center mt-5"
        >
          <div className="w-5 h-5 rounded-full bg-[#6366f1]" />
          <div className="w-1 sm:h-80 h-40 accent-gradient" />
        </motion.div>

        <div className="flex flex-col gap-4 w-full max-w-5xl pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: isHeroVisible ? 0.2 : 0 }}
            className="font-black text-white lg:text-[76px] sm:text-[58px] xs:text-[46px] text-[36px] lg:leading-[94px] mt-2 tracking-tight"
          >
            Hi, I'm <span className="gradient-text">Prathamesh</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: isHeroVisible ? 0.4 : 0 }}
            className="text-[#dfd9ff] font-medium lg:text-[24px] sm:text-[20px] xs:text-[18px] text-[15px] lg:leading-[38px] tracking-wide w-full"
          >
            Full-Stack Developer & Cyber Security Graduate (Class of 2026). I build production web applications and research AI-driven security threats.
          </motion.p>
        </div>
      </div>

      {/* Canvas container with responsive positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-0"
      >
        <div className="w-full h-full max-w-7xl mx-auto px-6 sm:px-16">
          <ErrorBoundary>
            <ComputersCanvas />
          </ErrorBoundary>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center"
      >
        <a href="#about" aria-label="Scroll to about section">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#6366f1] flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-[#6366f1] mb-1"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
