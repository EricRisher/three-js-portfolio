import { useEffect } from "react";
import Startup from "../xmb/Startup";
import VideoBackground from "../xmb/VideoBackground";
import XMBMenu from "../xmb/XMBMenu";
import PSPPowerSlider from "./PSPPowerSlider";

export default function PSPScreen({
  showUI,
  focused,
  setFocused,
  pspRef,
}: {
  showUI: boolean;
  focused: boolean;
  setFocused: (v: boolean) => void;
  pspRef: React.RefObject<HTMLDivElement>;
}) {
  // click-to-focus only AFTER powered on
  const handleClick = () => {
    if (showUI && !focused) return; // block until slider completes
    if (showUI && focused) setFocused(true);
  };

  useEffect(() => {
    if (!focused) return;

    const handler = (e: Event) => {
      const key = (e as CustomEvent).detail;
      console.log("PSP NAV:", key);
    };

    window.addEventListener("psp-key", handler);
    return () => window.removeEventListener("psp-key", handler);
  }, [focused]);

  return (
    <div className="absolute w-full h-full flex justify-center items-end pointer-events-none">
      <div
        ref={pspRef}
        onClick={handleClick}
        className={`
          w-[614px] h-[344px] relative overflow-hidden mb-[118px] rounded-sm
          pointer-events-auto transition-all duration-300
        
        `}
      >
        {/* --- power-on slider appears BEFORE focus is granted --- */}
        {showUI && !focused && (
          <PSPPowerSlider onComplete={() => setFocused(true)} />
        )}

        {showUI && focused && (
          <>
            <Startup />
            <VideoBackground />
            <XMBMenu />
          </>
        )}
      </div>
    </div>
  );
}
