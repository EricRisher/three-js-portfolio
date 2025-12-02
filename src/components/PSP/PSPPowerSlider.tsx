"use client";

import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function PSPPowerSlider({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const x = useMotionValue(0);
  const max = 200; // travel distance

  const onDragEnd = () => {
    const current = x.get();

    if (current > max * 0.8) {
      // snap to end
      x.set(max);
      setTimeout(onComplete, 150);
    } else {
      // reset
      x.set(0);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 w-[260px] h-[48px] bg-black/40 backdrop-blur-sm rounded-lg border border-white/20 flex items-center px-2">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: max }}
        style={{ x }}
        dragElastic={0.1}
        onDragEnd={onDragEnd}
        className="w-[70px] h-[36px] bg-amber-50 text-black rounded-lg shadow-md cursor-pointer flex items-center justify-center select-none"
      >
        On
      </motion.div>

      <span className="absolute left-1/2 -translate-x-1/5 text-xs text-white/70 pointer-events-none">
        slide to power on
      </span>
    </div>
  );
}
