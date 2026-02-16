import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlassmorphicNavigation from "@/components/portfolio/GlassmorphicNavigation";
import Hero from "@/components/portfolio/Hero";
import MarqueeText from "@/components/portfolio/MarqueeText";
import Results from "@/components/portfolio/Results";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Approach from "@/components/portfolio/Approach";
import Availability from "@/components/portfolio/Availability";
import Footer from "@/components/portfolio/Footer";
import FluidCursor from "@/components/ui/FluidCursor";
import FluidBackground from "@/components/ui/fluid/FluidBackground";
import ScrollSection from "@/components/animations/ScrollSection";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative min-h-screen bg-transparent cursor-none overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

      {/* Fluid Background (Fixed) */}
      <FluidBackground />

      {/* CodePen 2: Fluid Cursor */}
      <FluidCursor />

      {/* Main Content */}
      <GlassmorphicNavigation />

      <main ref={containerRef} className="relative z-10 w-full">
        <motion.div style={{ opacity }}>

          {/* Hero Section */}
          <ScrollSection triggerHook={0.4}>
            <div data-scroll-animate>
              <Hero />
            </div>
          </ScrollSection>

          {/* Marquee Section */}
          <ScrollSection triggerHook={0.5}>
            <div data-scroll-animate>
              <MarqueeText />
            </div>
          </ScrollSection>

          {/* Results Section */}
          <ScrollSection triggerHook={0.5}>
            <div data-scroll-animate>
              <Results />
            </div>
          </ScrollSection>

          {/* Projects Section */}
          {/* Projects Section - HyperScroll handles its own pinning */}
          <Projects />

          {/* Experience Section */}
          <ScrollSection triggerHook={0.5}>
            <div data-scroll-animate>
              <Experience />
            </div>
          </ScrollSection>

          {/* Approach Section */}
          <ScrollSection triggerHook={0.5}>
            <div data-scroll-animate>
              <Approach />
            </div>
          </ScrollSection>

          {/* Availability Section */}
          <ScrollSection triggerHook={0.5}>
            <div data-scroll-animate>
              <Availability />
            </div>
          </ScrollSection>

          <Footer />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
