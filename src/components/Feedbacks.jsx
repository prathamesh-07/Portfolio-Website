import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-8 rounded-3xl xs:w-[320px] w-full flex flex-col justify-between border border-white/5 shadow-card'
  >
    <div>
      <span className='text-xs font-semibold uppercase tracking-wider text-[#6366f1] bg-[#6366f1]/10 px-2.5 py-1 rounded-full'>
        {designation}
      </span>

      <div className='mt-4'>
        <p className='text-white font-medium tracking-wide text-[16px] leading-relaxed'>{testimonial}</p>
      </div>
    </div>

    <div className='mt-6 pt-4 border-t border-white/5 flex flex-col'>
      <p className='text-white font-bold text-[15px]'>
        {name}
      </p>
      <p className='text-secondary text-[12px] mt-0.5'>
        {company}
      </p>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Academic Foundation</p>
          <h2 className={styles.sectionHeadText}>Education.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
