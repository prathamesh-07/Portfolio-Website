import React, { Suspense, lazy } from "react";
import useHomeVariant from "../hooks/useHomeVariant";
import LiteHomePage from "./LiteHomePage";
import ErrorBoundary from "../components/shared/ErrorBoundary";

// Lazy-load the full 3D Desktop variant exclusively for desktop devices with fine pointers & WebGL2
const DesktopHomePage = lazy(() => import("./DesktopHomePage"));

const HomePage = () => {
  const { is3D } = useHomeVariant();

  if (is3D) {
    return (
      <ErrorBoundary fallback={<LiteHomePage />}>
        <Suspense fallback={<LiteHomePage />}>
          <DesktopHomePage />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <LiteHomePage />;
};

export default HomePage;
