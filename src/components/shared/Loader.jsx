import React from "react";
import { createPortal } from "react-dom";
import { useLoader } from "../../context/LoaderContext";
import { PC_LETTERS_DATA_URI, PC_RING_DATA_URI } from "./loaderShared";

/**
 * React loader component for replaying the branded entrance overlay
 * (e.g. when clicking the header PC logo).
 * Renders the identical visual markup: PC Logo with rotating ring.
 */
const Loader = () => {
  const { isLoading, loadingReason, isReplayExiting } = useLoader();

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
        transform: isReplayExiting ? "translateY(-8px) scale(0.96)" : "translateY(0) scale(1)",
      }}
    >
      <div className="loader-content">
        <div className="pc-loader-wrap" role="img" aria-label="Prathamesh Chiddarwar PC Logo Loading">
          <div className="pc-loader-glow" aria-hidden="true" />
          <img
            className="pc-loader-ring"
            src={PC_RING_DATA_URI}
            alt=""
            width={112}
            height={112}
            aria-hidden="true"
          />
          <img
            className="pc-loader-letters"
            src={PC_LETTERS_DATA_URI}
            alt="PC"
            width={112}
            height={112}
          />
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
