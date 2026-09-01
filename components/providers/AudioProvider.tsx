"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

type SoundType = "fire" | "water" | "click";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: SoundType) => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playSound: () => {},
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  
  // Throttle references to prevent overlapping audio spam
  const lastPlayedRef = useRef<Record<SoundType, number>>({
    fire: 0,
    water: 0,
    click: 0
  });

  useEffect(() => {
    // Check local storage for preference
    const stored = localStorage.getItem("portfolio_audio_muted");
    if (stored) setIsMuted(stored === "true");
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newVal = !prev;
      localStorage.setItem("portfolio_audio_muted", String(newVal));
      return newVal;
    });
  };

  const playSound = (type: SoundType) => {
    if (isMuted) return;

    const now = Date.now();
    // Throttle: 500ms for fire, 1000ms for water, 100ms for click
    const delayMap: Record<SoundType, number> = { fire: 500, water: 1000, click: 100 };
    
    if (now - lastPlayedRef.current[type] < delayMap[type]) {
      return;
    }

    lastPlayedRef.current[type] = now;

    // In a full production environment, you would instantiate Audio objects here.
    // e.g. const audio = new Audio(`/sounds/${type}.mp3`);
    // audio.volume = 0.2;
    // audio.play().catch(() => {});
    
    // For now, we simulate the framework log since assets aren't strictly uploaded
    console.debug(`[Audio System]: Played ${type} sound sequence.`);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </AudioContext.Provider>
  );
}
