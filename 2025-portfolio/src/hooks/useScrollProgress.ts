import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Progress based on first 2 screen heights
      const maxScroll = windowHeight * 2;
      const rawProgress = scrollY / maxScroll;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clampedProgress);
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
