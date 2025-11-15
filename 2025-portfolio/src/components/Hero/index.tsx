"use client";

import { motion } from "framer-motion";
import { HeroScene } from "./HeroScene";
import {
  fadeInUp,
  staggerLetters,
  letter,
  floatingEffect,
} from "@/lib/animations";
import Navigation from "./Navigation";
import "./hero.css";

export function Hero() {
  return (
    <section className="hero-section relative h-[70vh] w-full overflow-hidden flex flex-col text-white">
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="px-4 pt-14">
          <HeroScene />
          <Navigation />

          <div className="text-right">
            <motion.h1
              variants={staggerLetters}
              className="text-[7vw] font-bold tracking-[-9px]"
              initial="hidden"
              animate="visible"
            >
              {Array.from("CREATIVE DEVELOPER").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  variants={letter}
                  className="inline-block"
                  aria-hidden={char === " "}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[3vw]/10 mb-6 text-[#dfe5fa] translate-y-[-20px]"
              initial="hidden"
              animate="visible"
            >
              I turn ideas into functional and practical
              <br /> design, obsessing over perfection,
              <br /> and delivering results.
            </motion.p>
          </div>
        </div>

        {/* Recent Work - Positioned at bottom */}
        <div className="mt-auto px-4 pb-4">
          <motion.h2
            variants={floatingEffect}
            className="text-[20px]/6 text-[#888888] mb-2 text-center translate-y-20"
            initial="initial"
            animate="animate"
          >
            ↓ Explore ↓
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-right text-[40px]/9 line-height-[1.2]"
            initial="hidden"
            animate="visible"
          >
            RECENT WORK
            <span className="h1 text-[#272727]">
              <br /> DRIVEWAY BLASTERS
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
