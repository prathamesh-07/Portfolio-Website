import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../../constants";
import { styles } from "../../styles";
import { github } from "../../assets";
import { IconArrowRight } from "../shared/Icons";

const LiteWorks = () => {
  const shouldReduce = useReducedMotion();

  return (
    <section id="works" className="py-16 px-6 sm:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: shouldReduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: shouldReduce ? 0 : 0.45, delay: shouldReduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 text-[#94a3b8] text-base sm:text-lg max-w-3xl leading-relaxed"
      >
        Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and technical write-ups.
      </motion.p>

      {/* Projects Cards Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => {
          const isWeb = project.track === "Web Development";
          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: shouldReduce ? 0 : 0.45,
                delay: shouldReduce ? 0 : index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              className="bg-[#0b1030] rounded-2xl overflow-hidden border border-[#1e212e] hover:border-[#6366f1]/40 transition-all flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            >
              <div>
                {/* Project Image Banner */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#050816]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  {/* GitHub button top-right */}
                  <div className="absolute top-3 right-3">
                    <a
                      href={project.source_code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} source code on GitHub`}
                      className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/10 hover:border-[#6366f1] transition-transform active:scale-95"
                    >
                      <img src={github} alt="GitHub" className="w-5 h-5 object-contain" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-white font-bold text-lg leading-snug">
                      {project.name}
                    </h3>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isWeb ? "rgba(99,102,241,0.15)" : "rgba(136,92,245,0.15)",
                        color: isWeb ? "#a5b4fc" : "#c4b5fd",
                        border: `1px solid ${isWeb ? "rgba(99,102,241,0.3)" : "rgba(136,92,245,0.3)"}`,
                      }}
                    >
                      {project.track}
                    </span>
                  </div>

                  {project.subtitle && (
                    <p className="text-xs text-[#a5b4fc] font-medium mb-3">
                      {project.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tags Footer */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-wrap gap-1.5 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/5 text-[#94a3b8] border border-white/10"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA to full Projects Page */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0b1030] border border-[#1e212e] hover:border-[#6366f1] active:scale-[0.97] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        >
          <span>Explore All Projects &amp; Research</span>
          <IconArrowRight size={14} className="text-[#6366f1]" />
        </Link>
      </div>
    </section>
  );
};

export default LiteWorks;
