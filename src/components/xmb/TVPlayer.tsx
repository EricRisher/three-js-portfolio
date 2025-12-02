"use client";
import React, { useEffect } from "react";
import SnakeGame from "./games/SnakeGame";
import "./TVPlayer.css";

interface TVPlayerProps {
  src: string;
  onClose: () => void;
  minimized?: boolean;
  setIsInputLocked?: (locked: boolean) => void;
}

const TVPlayer: React.FC<TVPlayerProps> = ({
  onClose,
  minimized = false,
  setIsInputLocked,
}) => {
  // 🧠 Ensure input lock is active while mounted
  useEffect(() => {
    if (setIsInputLocked) setIsInputLocked(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (setIsInputLocked) setIsInputLocked(false);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (setIsInputLocked) setIsInputLocked(false);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, setIsInputLocked]);

  return (
    <div className={`tv-player-overlay ${minimized ? "minimized" : ""}`}>
      <div className="tv-container relative p-6 rounded-2xl shadow-inner">
        <div className="tv-screen relative z-10 flex justify-center items-center">
          <SnakeGame />
        </div>
      </div>

      <button
        className="tv-close-btn"
        onClick={() => {
          if (setIsInputLocked) setIsInputLocked(false);
          onClose();
        }}
      >
        ✖
      </button>
    </div>
  );
};

export default TVPlayer;
