import React, { useEffect } from "react";
import { usePSPStartup } from "@/context/PSPStartupContext";

interface StartupProps {
  onEnd?: () => void;
}

function Startup({ onEnd }: StartupProps) {
  const { phase } = usePSPStartup();

  useEffect(() => {
    console.log("Startup component mounted");
    const audio = new Audio("/sounds/startup.mp3");
    audio.play().catch(() => {});
    console.log("Audio started");
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    console.log("Startup observed phase:", phase);
    if (phase === "showUI" && onEnd) {
      console.log("Startup ended, calling onEnd()");
      onEnd();
    }
  }, [phase, onEnd]);

  // Overlay is visible during fadeIn and fadeOutOverlay
  const showOverlay = phase === "fadeIn" || phase === "fadeOutOverlay";

  let overlayOpacity = "opacity-100";
  if (phase === "fadeOutOverlay") overlayOpacity = "opacity-0";
  if (phase === "showH1" || phase === "hideH1" || phase === "showUI")
    overlayOpacity = "opacity-0";

  let h1Opacity = "opacity-0";
  let h1Transition = "duration-300";
  if (phase === "showH1") h1Opacity = "opacity-100";
  if (phase === "hideH1") {
    h1Opacity = "opacity-0";
    h1Transition = "duration-700";
  }

  return (
    <div className="absolute inset-0 z-[200] w-full h-full pointer-events-none">
      {/* Overlay covering only the PSP screen */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          showOverlay ? overlayOpacity : "opacity-0"
        }`}
        style={{ transition: "opacity 1.2s" }}
      />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className={`text-2xl text-white transition-opacity ${h1Transition} ${h1Opacity}`}
        >
          Eric&apos;s Computer Entertainment
        </h1>
      </div>
    </div>
  );
}

export default Startup;
