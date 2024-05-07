// components/FullscreenModal.tsx
import { on } from "events";
import React from "react";
import "./animations.css";

const FullscreenModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  setTimeout(() => {
    onClose();
  }, 4800);

  return (
    <div
      className="bg-pan-left slide-out-fwd-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "8px",
          height: "100%",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FullscreenModal;
