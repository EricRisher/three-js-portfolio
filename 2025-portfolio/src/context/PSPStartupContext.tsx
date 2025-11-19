"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type PSPPhase =
  | "pending"
  | "fadeInOverlay"
  | "fadeOutOverlay"
  | "showH1"
  | "hideH1"
  | "showUI";

interface PSPStartupContextType {
  phase: PSPPhase;
  startPSPSequence: () => void;
}

const PSPStartupContext = createContext<PSPStartupContextType>({
  phase: "pending",
  startPSPSequence: () => {},
});

export const usePSPStartup = () => useContext(PSPStartupContext);

export const PSPStartupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [phase, setPhase] = useState<PSPPhase>("pending");

  const startPSPSequence = () => {
    if (phase !== "pending") return; // only start once
    console.log("PSP startup sequence initiated");
    setPhase("fadeInOverlay");
  };

  useEffect(() => {
    console.log("Current PSP phase:", phase);
    let timer: NodeJS.Timeout;

    switch (phase) {
      case "fadeInOverlay":
        timer = setTimeout(() => {
          console.log("Transitioning to fadeOutOverlay");
          setPhase("fadeOutOverlay");
        }, 1000); // 1s fade in
        break;

      case "fadeOutOverlay":
        timer = setTimeout(() => {
          console.log("Transitioning to showH1");
          setPhase("showH1");
        }, 1000); // fade out overlay
        break;

      case "showH1":
        timer = setTimeout(() => {
          console.log("Transitioning to hideH1");
          setPhase("hideH1");
        }, 3000); // show H1 for 3s
        break;

      case "hideH1":
        timer = setTimeout(() => {
          console.log("Transitioning to showUI");
          setPhase("showUI");
        }, 800); // fade out H1
        break;

      default:
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase]);

  return (
    <PSPStartupContext.Provider value={{ phase, startPSPSequence }}>
      {children}
    </PSPStartupContext.Provider>
  );
};
