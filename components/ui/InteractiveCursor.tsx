"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/components/providers/CursorProvider";

export default function InteractiveCursor() {
  const { cursorType, isMobile } = useCursor();
  const [clicked, setClicked] = useState(false);

  // Core coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring physics
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center offset based on 32px size
      mouseY.set(e.clientY - 16);
    };

    const manageMouseDown = () => setClicked(true);
    const manageMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mousedown", manageMouseDown);
    window.addEventListener("mouseup", manageMouseUp);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", manageMouseDown);
      window.removeEventListener("mouseup", manageMouseUp);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  // Visual state variants
  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 240, 255, 0.1)",
      border: "1px solid rgba(0, 240, 255, 0.5)",
      mixBlendMode: "screen" as any,
    },
    pointer: {
      height: 64,
      width: 64,
      backgroundColor: "rgba(124, 58, 237, 0.15)",
      border: "1px solid rgba(124, 58, 237, 0.8)",
      mixBlendMode: "screen" as any,
      x: "-16px", // adjust center for size change
      y: "-16px",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      variants={variants}
      animate={cursorType === "pointer" ? "pointer" : "default"}
      transition={{ type: "tween", duration: 0.15 }}
    >
      <motion.div 
        className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]"
        animate={{ scale: clicked ? 0.5 : 1 }}
      />
    </motion.div>
  );
}
