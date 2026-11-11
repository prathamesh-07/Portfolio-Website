import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "../../constants";
import { styles } from "../../styles";

const LiteFeedbacks = () => {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-16 px-6 sm:px-16 max-w-7xl mx-auto">
      <div className="bg-[#0b1030] rounded-3xl p-6 sm:p-10 border border-[#1e212e]">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: shouldReduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className={styles.sectionSubText}>Academic Foundation</p>
          <h2 className={styles.sectionHeadText}>Education.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: shouldReduce ? 0 : 0.45,
                delay: shouldReduce ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-[#050816] p-6 rounded-2xl border border-[#1e212e] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6366f1] bg-[#6366f1]/10 px-2.5 py-1 rounded-full border border-[#6366f1]/20">
                  {item.designation}
                </span>
                <p className="text-white font-medium text-sm sm:text-base leading-relaxed mt-4">
                  {item.testimonial}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-white font-bold text-sm">{item.name}</p>
                <p className="text-[#94a3b8] text-xs mt-0.5">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiteFeedbacks;
