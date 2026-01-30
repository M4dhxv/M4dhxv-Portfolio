import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="status-badge mb-8"
      >
        <span className="status-dot" />
        <span className="text-muted-foreground">Open for UGC & Creative Direction roles</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center max-w-5xl leading-tight mb-6"
      >
        Hello, I'm{" "}
        <span className="text-gradient">Madhav</span>{" "}
        <span className="inline-block animate-float">✨</span> A GenAI UGC Lead turning{" "}
        <span className="italic">attention</span> into{" "}
        <span className="inline-block">
          <span className="relative">
            demand
            <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M0 7 Q25 0 50 4 Q75 8 100 2" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </span>
        .
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-12"
      >
        I build, scale, and direct UGC programs for AI and GenAI startups. 
        I've led strategy for YC-backed companies and driven 40M+ monthly reach.
      </motion.p>

      {/* Bento Grid Hero Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl"
      >
        {/* Instagram Card */}
        <motion.div
          whileHover={{ rotate: -1, scale: 1.02 }}
          className="col-span-1 sticky-note sticky-note-yellow p-4"
          style={{ transform: "rotate(-2deg)" }}
        >
          <span className="text-3xl mb-2 block">📸</span>
          <p className="font-medium text-foreground/90 text-sm">Instagram & TikTok</p>
          <p className="text-xs text-foreground/70">Primary Platforms</p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          whileHover={{ rotate: 1, scale: 1.02 }}
          className="col-span-1 sticky-note sticky-note-green p-4"
          style={{ transform: "rotate(1deg)" }}
        >
          <p className="font-serif text-2xl font-bold text-foreground/90">40M+</p>
          <p className="text-xs text-foreground/70">Monthly Reach (Peak)</p>
        </motion.div>

        {/* YC Card */}
        <motion.div
          whileHover={{ rotate: -1, scale: 1.02 }}
          className="col-span-1 sticky-note sticky-note-pink p-4"
          style={{ transform: "rotate(2deg)" }}
        >
          <span className="text-2xl mb-1 block">🚀</span>
          <p className="font-medium text-foreground/90 text-sm">YC-Backed</p>
          <p className="text-xs text-foreground/70">Startup Experience</p>
        </motion.div>

        {/* Speed Card */}
        <motion.div
          whileHover={{ rotate: 1, scale: 1.02 }}
          className="col-span-1 sticky-note sticky-note-blue p-4"
          style={{ transform: "rotate(-1deg)" }}
        >
          <p className="font-serif text-2xl font-bold text-foreground/90">10 days</p>
          <p className="text-xs text-foreground/70">0 → 6K followers</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
