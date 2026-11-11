import React, { useEffect } from "react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Footer,
} from "../components";

const DesktopHomePage = () => {
  useEffect(() => {
    document.title = "Prathamesh Chiddarwar | Full-Stack Developer & Cyber Security Graduate";
  }, []);

  return (
    <div className='relative z-0 bg-primary'>
      <Navbar />
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
      <Footer />
    </div>
  );
};

export default DesktopHomePage;
