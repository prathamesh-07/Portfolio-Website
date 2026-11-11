import React, { useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

import LiteHero from "../components/lite/LiteHero";
import LiteAbout from "../components/lite/LiteAbout";
import LiteExperience from "../components/lite/LiteExperience";
import LiteTech from "../components/lite/LiteTech";
import LiteWorks from "../components/lite/LiteWorks";
import LiteFeedbacks from "../components/lite/LiteFeedbacks";
import LiteContact from "../components/lite/LiteContact";

const LiteHomePage = () => {
  useEffect(() => {
    document.title = "Prathamesh Chiddarwar | Full-Stack Developer & Cyber Security Graduate";
  }, []);

  return (
    <div className="relative z-0 bg-[#050816] text-[#e2e8f0] overflow-x-hidden">
      {/* Global Shared Navbar */}
      <Navbar />

      {/* Hero section with subtle topographic hero background pattern */}
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <LiteHero />
      </div>

      {/* Main Sections */}
      <LiteAbout />
      <LiteExperience />
      <LiteTech />
      <LiteWorks />
      <LiteFeedbacks />

      {/* Contact Section with Subtle CSS Dot Grid instead of Three.js Stars */}
      <div className="relative z-0">
        <div className="bg-dot-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />
        <LiteContact />
      </div>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
};

export default LiteHomePage;
