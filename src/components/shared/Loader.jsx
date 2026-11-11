import React from "react";
import { createPortal } from "react-dom";
import { useLoader } from "../../context/LoaderContext";
import { LOADER_SVG, LOADER_LABEL } from "./loaderShared";

/**
 * React loader component for replaying the branded entrance overlay
 * (e.g. when clicking the header PC logo).
 * Renders the identical visual markup, SVG mark, progress bar, and label as the inline HTML loader.
 */
const Loader = () => {
  const { isLoading, loadingReason, isReplayExiting, replayProgress } = useLoader();

  // The initial document load is handled by inlined #app-loader in index.html and orchestrated in LoaderContext.
  // This React component exclusively mounts during replay ("logo").
  if (!isLoading || loadingReason !== "logo") {
    return null;
  }

  const content = (
    <div
      id="app-loader-replay"
      role="status"
      aria-label="Loading"
      className={isReplayExiting ? "loader-exiting" : ""}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-loader)",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition:
          "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: "auto",
        opacity: isReplayExiting ? 0 : 1,
        transform: isReplayExiting ? "translateY(-12px)" : "translateY(0)",
      }}
    >
      <div className="loader-content">
        <div dangerouslySetInnerHTML={{ __html: LOADER_SVG }} />
        <div className="loader-meta" style={{ opacity: 1, animation: "none" }}>
          <p className="loader-label">{LOADER_LABEL}</p>
          <div className="loader-bar-bg">
            <div
              id="loader-progress-bar-replay"
              className="loader-bar-fill"
              style={{
                transform: `scaleX(${replayProgress})`,
                transition: "transform 200ms ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(content, document.body);
  }

  return content;
};

export default Loader;
