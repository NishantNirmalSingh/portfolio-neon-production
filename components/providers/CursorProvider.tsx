"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CursorType = "default" | "pointer" | "text" | "hidden";

interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  isMobile: boolean;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  setCursorType: () => {},
  isMobile: false,
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is a touch screen (coarse pointer)
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType, isMobile }}>
      <div className={!isMobile ? "hide-native-cursor" : ""}>
        {children}
      </div>
    </CursorContext.Provider>
  );
}
