import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "../../constants";
import { styles } from "../../styles";
import { IconExternalLink } from "../shared/Icons";

const LiteExperience = () => {
  const shouldReduce = useReducedMotion();

  // Exclude HackMIT as strictly required by prompt
  const displayExperiences = experiences.filter(
    (exp) => !exp.title.toLowerCase().includes("hackmit")
  );

  return (
    <section id="experience" className="py-16 px-6 sm:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: shouldReduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work &amp; Research.</h2>
      </motion.div>

      {/* Clean Mobile Timeline */}
      <div className="mt-12 relative pl-6 sm:pl-8 border-l-2 border-[#1e212e] space-y-12">
        {displayExperiences.map((exp, index) => {
          const isWeb = exp.track === "Web Development";
          return (
            <motion.div
              key={`${exp.title}-${index}`}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: shouldReduce ? 0 : 0.45,
                delay: shouldReduce ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Timeline marker node */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-[#050816]"
                style={{
                  backgroundColor: isWeb ? "#6366f1" : "#885cf5",
                  boxShadow: `0 0 10px ${isWeb ? "rgba(99,102,241,0.5)" : "rgba(136,92,245,0.5)"}`,
                }}
                aria-hidden="true"
              />

              {/* Card Container */}
              <div className="bg-[#0b1030] p-6 sm:p-7 rounded-2xl border border-[#1e212e] shadow-[0_6px_20px_rgba(0,0,0,0.25)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isWeb ? "rgba(99,102,241,0.15)" : "rgba(136,92,245,0.15)",
                      color: isWeb ? "#a5b4fc" : "#c4b5fd",
                      border: `1px solid ${isWeb ? "rgba(99,102,241,0.3)" : "rgba(136,92,245,0.3)"}`,
                    }}
                  >
                    {exp.track}
                  </span>
                  <span className="text-xs text-[#94a3b8] font-mono">{exp.date}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {exp.title}
                </h3>
                <p className="text-sm text-[#94a3b8] font-medium mt-1 mb-4">
                  {exp.company_name}
                </p>

                <ul className="space-y-2 mt-4">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#dfd9ff] leading-relaxed flex items-start gap-2.5">
                      <span className="text-[#6366f1] text-sm mt-0.5" aria-hidden="true">▸</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {exp.link && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#885cf5] hover:text-white transition-colors"
                    >
                      <span>Open Publication Record</span>
                      <IconExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default LiteExperience;
