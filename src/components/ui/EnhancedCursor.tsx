"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const EnhancedCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number>();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracking with inertial follow
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      mouseRef.current.vx = x - mouseRef.current.x;
      mouseRef.current.vy = y - mouseRef.current.y;

      mouseRef.current.x = x;
      mouseRef.current.y = y;

      // Cursor element
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: x,
          y: y,
          duration: 0.1,
          overwrite: "auto",
        });
      }

      // Generate particles
      if (Math.random() < 0.4) {
        const particle: Particle = {
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 4 + mouseRef.current.vx * 0.5,
          vy: (Math.random() - 0.5) * 4 + mouseRef.current.vy * 0.5,
          life: 1,
          maxLife: 1,
          size: Math.random() * 6 + 2,
        };
        particlesRef.current.push(particle);
      }

      prevMouseRef.current = { x, y };
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.vx *= 0.98; // Air resistance

        if (p.life > 0) {
          const alpha = p.life * 0.6;

          // Gradient for smoke effect
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);

          if (isDarkMode) {
            gradient.addColorStop(0, `rgba(100, 200, 255, ${alpha})`);
            gradient.addColorStop(1, `rgba(100, 200, 255, 0)`);
          } else {
            gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha * 0.8})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }

        return false;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9997]"
      />
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 rounded-full pointer-events-none z-[9999] bg-primary/80 shadow-lg"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default EnhancedCursor;
