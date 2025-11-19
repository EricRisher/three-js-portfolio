import { useStartup } from "@/context/PSPStartupContext";
import { useRef, useState, useEffect } from "react";

export default function SplashModal() {
  const { startSequence } = useStartup();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [visible, setVisible] = useState(true);

  const handleStart = async () => {
    try {
      await audioRef.current?.play();
    } catch {
      /* ignore play errors */
    }
    startSequence();
    setVisible(false);
  };

  // allow skipping by pressing Space
  useEffect(() => {
    if (!visible) return;

    const onKey = (e: KeyboardEvent) => {
      // use e.code === 'Space' (most reliable) and also accept ' ' / 'Spacebar'
      if (e.code === "Space" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        handleStart();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible)
    return (
      <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center">
        <div className="text-center p-8 max-w-2xl">
          <h2 className="text-4xl mb-6 text-white">
            Welcome to Eric&#39;s PS3 Experience
          </h2>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center">
      <div className="text-center p-8 max-w-2xl">
        <h2 className="text-4xl mb-6 text-white">
          Welcome to Eric&#39;s PS3 Experience
        </h2>
        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg
                                         transition-all duration-300 transform hover:scale-105"
        >
          START
        </button>
        <audio ref={audioRef} preload="auto">
          <source src="/sounds/startup.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
