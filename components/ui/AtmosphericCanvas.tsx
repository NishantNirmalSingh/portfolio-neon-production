"use client";

import { useEffect, useRef } from "react";

export default function AtmosphericCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fast exit if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    // Hardcode particle limits based on request: 30-80
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 80);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      depth: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.depth = Math.random() * 3 + 1; // 1 to 4
        this.size = (Math.random() * 2) / this.depth; // Smaller if deeper
        this.speedX = (Math.random() - 0.5) * (0.2 / this.depth);
        this.speedY = (Math.random() - 0.5) * (0.2 / this.depth) - 0.1; // Slight upward drift
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around bounds
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        
        // Very subtle glow for closer particles
        if (this.depth < 1.5) {
          context.shadowBlur = 10;
          context.shadowColor = "#00f0ff";
        } else {
          context.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      particlesArray = [];
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      // Clear with dark atmospheric slightly trailing color
      ctx.fillStyle = "#010108";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none"
    />
  );
}
