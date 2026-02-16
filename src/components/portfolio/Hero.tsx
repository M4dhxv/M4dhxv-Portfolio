import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial timeline
    const tl = gsap.timeline();

    // Orbs animation (floating)
    gsap.to(".orb", {
      y: "random(-50, 50)",
      x: "random(-50, 50)",
      scale: "random(0.8, 1.2)",
      duration: "random(5, 10)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1,
    });

    // Content Reveal
    tl.from(badgeRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      }, "-=0.5")
      .from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .from(subtextRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6")
      .from(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.4");

    // Parallax Effect on Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;

      gsap.to(headingRef.current, {
        x: x * 50,
        y: y * 50,
        duration: 2,
        ease: "power2.out",
      });

      gsap.to(orbsRef.current, {
        x: x * -100,
        y: y * -100,
        duration: 3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5" />

      {/* Floating orbs container for parallax */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="orb absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-60" />
        <div className="orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-60" />
        <div className="orb absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Status badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Available for GenAI & Creative Direction roles
          </span>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1
            ref={headingRef}
            className="text-6xl md:text-9xl font-bold tracking-tighter"
          >
            Hey! I'm{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300 cursor-default">
              Madhav
            </span>
          </h1>

          <p
            ref={textRef}
            className="text-3xl md:text-5xl font-medium text-muted-foreground"
          >
            a GenAI UGC Lead
          </p>

          <p
            ref={subtextRef}
            className="text-xl md:text-2xl text-muted-foreground/70 max-w-3xl mx-auto mt-6"
          >
            Currently turning{" "}
            <span className="text-foreground font-semibold italic">attention</span>{" "}
            into{" "}
            <span className="text-foreground font-semibold">demand</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <button
            ref={buttonRef}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
