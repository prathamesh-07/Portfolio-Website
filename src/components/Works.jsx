import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  subtitle,
  track,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className='w-full sm:w-[360px] flex flex-col'
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        scale={1.02}
        transitionSpeed={1000}
        className='bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col justify-between shadow-card border border-white/5'
      >
        <div>
          <div className='relative w-full h-[230px]'>
            <img
              src={image}
              alt={`${name} project`}
              className='w-full h-full object-cover rounded-2xl'
            />

            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} source code on GitHub`}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-transform hover:scale-110'
              >
                <img
                  src={github}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </a>
            </div>
          </div>

          <div className='mt-5'>
            <div className='flex items-center justify-between gap-2 mb-1.5'>
              <h3 className='text-white font-bold text-[22px]'>{name}</h3>
              <span className='text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-white/10 text-secondary'>
                {track}
              </span>
            </div>
            {subtitle && (
              <p className='text-xs text-[#dfd9ff] font-medium mb-2'>{subtitle}</p>
            )}
            <p className='text-secondary text-[14px] leading-relaxed'>{description}</p>
          </div>
        </div>

        <div className='mt-4 flex flex-wrap gap-2 pt-2 border-t border-white/5'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[13px] font-medium ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] w-full leading-[32px]'
      >
        Following projects showcase real-world applications across both full-stack web development and security engineering. Each project demonstrates end-to-end implementation with verified integrity checks, ML-based detection, and enterprise-grade role-based access control.
      </motion.p>

      <div className='mt-16 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className='mt-12 flex justify-center'>
        <Link
          to='/projects'
          className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-tertiary hover:bg-[#1f1938] border border-white/10 hover:border-[#6366f1]/50 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10'
        >
          <span>View All Projects & Research Publications (9+)</span>
          <span aria-hidden='true'>&rarr;</span>
        </Link>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
