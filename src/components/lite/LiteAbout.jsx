import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "../../constants";
import { styles } from "../../styles";

const LiteAbout = () => {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="py-16 px-6 sm:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: shouldReduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: shouldReduce ? 0 : 0.45, delay: shouldReduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 text-[#94a3b8] text-base sm:text-lg w-full leading-relaxed"
      >
        I am a Computer Science graduate (Class of 2026) specializing in Cyber Security and Forensics from MIT-WPU, Pune, and a full-stack developer with hands-on experience building and deploying production web applications end-to-end. My technical focus bridges secure web architectures (React, Next.js, Node.js, AWS) with hands-on penetration testing, vulnerability assessment (Wireshark, Nessus, Burp Suite), and 2 published IEEE research papers on AI-generated audio threats.
      </motion.p>

      {/* Responsive mobile cards grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {services.map((service, index) => {
          const isWeb = service.track === "Web Development";
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: shouldReduce ? 0 : 0.4,
                delay: shouldReduce ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              className="w-full rounded-2xl p-[1px] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform active:scale-[0.98]"
              style={{
                background: isWeb
                  ? "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(30,33,46,0.2) 100%)"
                  : "linear-gradient(135deg, rgba(136,92,245,0.4) 0%, rgba(30,33,46,0.2) 100%)",
              }}
            >
              <div className="bg-[#0b1030] rounded-2xl py-8 px-6 min-h-[260px] flex flex-col justify-between items-center text-center">
                <span
                  className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: isWeb ? "rgba(99,102,241,0.15)" : "rgba(136,92,245,0.15)",
                    color: isWeb ? "#a5b4fc" : "#c4b5fd",
                    border: `1px solid ${isWeb ? "rgba(99,102,241,0.3)" : "rgba(136,92,245,0.3)"}`,
                  }}
                >
                  {service.track}
                </span>

                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 object-contain my-3"
                  loading="lazy"
                />

                <h3 className="text-white text-lg font-bold leading-snug">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default LiteAbout;
