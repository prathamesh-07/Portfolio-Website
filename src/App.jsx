import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./components/shared/Loader";
import ScrollToTopButton from "./components/shared/ScrollToTopButton";

const App = () => {
  return (
    <LoaderProvider>
      <Loader />
      <ScrollToTopButton />
      <ErrorBoundary>
        <Routes>
          {/* 4 Core Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Redirects from dropped routes per Revision Section 3 */}
          <Route path="/experience" element={<Navigate to="/about" replace />} />
          <Route path="/skills" element={<Navigate to="/about" replace />} />
          <Route path="/research" element={<Navigate to="/projects?track=cybersecurity" replace />} />
          <Route path="/projects/:id" element={<Navigate to="/projects" replace />} />

          {/* Fallback 404 */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </LoaderProvider>
  );
};

export default App;
