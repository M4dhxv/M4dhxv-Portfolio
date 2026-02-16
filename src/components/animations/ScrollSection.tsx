"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: ReactNode;
  triggerHook?: number; // 0-1, where section enters viewport
  scrub?: boolean | number;
  stagger?: number;
  className?: string;
}

const ScrollSection = ({
  children,
  triggerHook = 0.3,
  scrub = 0.5,
  stagger = 0.1,
  className = "",
}: ScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    // Get all child elements for stagger
    const children = contentRef.current.querySelectorAll(
      "[data-scroll-animate]"
    );

    // Timeline for this section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top ${(1 - triggerHook) * 100}%`,
        end: `top ${(1 - triggerHook) * 100 - 200}%`,
        scrub: scrub,
        markers: false,
      },
    });

    // Animate container - start visible to prevent invisible content
    tl.fromTo(
      containerRef.current,
      {
        opacity: 1,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0
    );

    // Stagger child animations - start more visible
    children.forEach((child, index) => {
      tl.fromTo(
        child,
        {
          opacity: 0.95,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        index * stagger
      );
    });

    return () => {
      // Cleanup
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [triggerHook, scrub, stagger]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default ScrollSection;
