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
  Loader,
} from "../components";

const HomePage = () => {
  useEffect(() => {
    document.title = "Prathamesh Chiddarwar | Full-Stack Developer & Cyber Security Student";
  }, []);

  return (
    <div className='relative z-0 bg-primary'>
      <Loader />
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

export default HomePage;

