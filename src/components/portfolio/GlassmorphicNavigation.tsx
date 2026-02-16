"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const GlassmorphicNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "results", "experience", "approach"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      if (!navRef.current) return;
      const rect = navRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Noise function for glass distortion
    const noise = (x: number, y: number, time: number) => {
      return Math.sin(x * 0.01 + time * 0.001) * Math.cos(y * 0.01 + time * 0.0015);
    };

    let animationId: number;

    const animate = () => {
      const time = Date.now();
      const isDark = document.documentElement.classList.contains("dark");

      // Clear with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle noise pattern for glass grain effect
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const noiseVal = noise(x, y, time);
        const alpha = Math.abs(noiseVal) * 0.15;

        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${alpha * 0.3})`
          : `rgba(0, 0, 0, ${alpha * 0.1})`;

        ctx.fillRect(x, y, 2, 2);
      }

      // Subtle waves for refraction effect
      ctx.strokeStyle = isDark
        ? `rgba(255, 255, 255, 0.05)`
        : `rgba(0, 0, 0, 0.03)`;
      ctx.lineWidth = 1;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const offset = Math.sin(time * 0.0001 + i) * 10;
        const waveY = 20 + i * 30 + offset;

        for (let x = 0; x < canvas.width; x += 20) {
          const y = waveY + Math.sin(x * 0.01 + time * 0.0002) * 3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "results", label: "Results" },
    { id: "experience", label: "Experience" },
    { id: "approach", label: "Approach" },
  ];

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      {/* Glass effect canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-full pointer-events-none opacity-100"
        style={{
          zIndex: 0,
        }}
      />

      {/* Navigation container */}
      <nav
        className="relative z-10 flex items-center gap-1 px-2 py-2 rounded-full
          backdrop-blur-xl bg-white/[0.08] dark:bg-white/[0.06]
          border border-white/[0.15] dark:border-white/[0.12]
          shadow-lg dark:shadow-xl
          hover:bg-white/[0.12] dark:hover:bg-white/[0.10]
          transition-all duration-300"
      >
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeSection === item.id
              ? "text-foreground dark:text-white"
              : "text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-white/20 dark:bg-white/15 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            {item.label}
          </motion.button>
        ))}
      </nav>

      {/* Theme toggle */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="ml-4 relative z-10"
      >
        <ThemeToggle />
      </motion.div>

      {/* Contact button */}
      <motion.a
        href="mailto:contact@madhav.com"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{ scale: 0.97 }}
        className="ml-3 px-5 py-2 rounded-full text-sm font-medium hidden sm:flex 
          items-center text-foreground dark:text-white
          bg-primary/10 dark:bg-primary/20
          hover:bg-primary/20 dark:hover:bg-primary/30
          backdrop-blur-xl border border-primary/20 dark:border-primary/30
          transition-all duration-300 relative z-10"
      >
        Get in Touch
      </motion.a>
    </motion.header>
  );
};

export default GlassmorphicNavigation;
