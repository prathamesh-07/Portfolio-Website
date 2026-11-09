import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 Not Found | Prathamesh Chiddarwar";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050816] text-white flex flex-col pt-20">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <span className="text-8xl font-black gradient-text tracking-widest">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="text-secondary text-sm sm:text-base max-w-md mb-8">
          The requested route does not exist. Use the links below to return to the verified sections.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            View Projects
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;

