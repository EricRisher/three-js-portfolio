"use client";
import { usePSPStartup } from "@/context/PSPStartupContext";
import { useEffect, useState } from "react";
import "./PS3Header.css";
import { motion, AnimatePresence } from "framer-motion";

function TextCarousel() {
  const texts = [
    "Welcome to my PS3 XMB inspired project",
    "Navigate using the arrow keys and select with Enter",
    "Checkout my GitHub github.com/ericrisher",
    "Learn more about me at EricRisher.com",
    "This is a work in progress, so stay tuned for updates",
    "Listen to music, watch videos, and view photos",
    "Rest in Peace PS3 XMB, 2006 - 2017",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="text-carousel-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: "-160%" }}
          transition={{ duration: 3, ease: "linear" }}
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const hourDeg = hours * 30 + minutes / 2; // 30° per hour + 0.5° per minute
  const minuteDeg = minutes * 6; // 6° per minute

  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // convert 0 to 12
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      setTimeString(`${month}/${day} ${hours}:${minutesStr} ${period}`);
    };

    updateTime();
    // Update once per minute
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ps3-clock-row">
      <div className="ps3-datetime">{timeString}</div>
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        className="ml-2 analog-clock"
        overflow="visible"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#fff"
          strokeWidth="10"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          stroke="#fff"
          strokeWidth="10"
          strokeLinecap="round"
          transform={`rotate(${hourDeg},50,50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          stroke="#fff"
          strokeWidth="10"
          strokeLinecap="round"
          transform={`rotate(${minuteDeg},50,50)`}
        />
      </svg>
    </div>
  );
}

export default function PS3Header() {
  const { phase } = useStartup();

  // Only show header after "showUI" phase
  if (phase !== "showUI") {
    return null;
  }

  return (
    <header className="ps3-header outline pt-4">
      <Clock />
      <TextCarousel />
    </header>
  );
}
