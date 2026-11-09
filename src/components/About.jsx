import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, track }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-6 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${
          track === "Web Development"
            ? "bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30"
            : "bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30"
        }`}>
          {track}
        </span>

        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[19px] font-bold text-center leading-snug'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I am a Computer Science student specializing in Cyber Security and Forensics at MIT-WPU, Pune, and a full-stack developer with hands-on experience building and deploying production web applications end-to-end. My technical focus bridges secure web architectures (React, Next.js, Node.js, AWS) with hands-on penetration testing, vulnerability assessment (Wireshark, Nessus, Burp Suite), and published IEEE research on AI-generated audio threats.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
