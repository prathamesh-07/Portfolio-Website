import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { technologies } from "../../constants";
import { styles } from "../../styles";

const LiteTech = () => {
  const shouldReduce = useReducedMotion();

  return (
    <section id="tech" className="py-12 px-6 sm:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <p className={styles.sectionSubText}>My Technical Stack</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-5xl mx-auto">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: shouldReduce ? 0 : 0.35,
              delay: shouldReduce ? 0 : (index % 6) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileTap={shouldReduce ? {} : { scale: 0.94 }}
            className="flex items-center gap-3 py-3 px-4 sm:px-5 rounded-2xl bg-[#0b1030] border border-[#1e212e] hover:border-[#6366f1]/50 active:scale-[0.96] transition-all shadow-[0_4px_14px_rgba(0,0,0,0.25)] min-h-[48px] cursor-default select-none"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              loading="lazy"
            />
            <span className="text-xs sm:text-sm font-semibold text-[#e2e8f0]">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LiteTech;
