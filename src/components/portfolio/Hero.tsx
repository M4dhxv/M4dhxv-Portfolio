import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-end px-4 pb-32 overflow-hidden">
      {/* Spline Traffic Light Background - Full Screen */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/trafficlight-SwC3ZMB6hYzA5vjumfKVi4Z6/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-auto"
          title="Traffic Light 3D"
        />
      </div>
      
      {/* Hero Text Content - Positioned at bottom, below traffic light */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-5xl"
      >
        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="status-badge mb-8 backdrop-blur-sm bg-card/80"
        >
          <span className="status-dot" />
          <span className="text-muted-foreground text-sm">Open for UGC & Creative Direction roles</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center leading-[1.1] mb-6 tracking-tight"
        >
          Hello, I'm{" "}
          <span className="text-gradient">Madhav</span>{" "}
          <motion.span 
            className="inline-block"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.span>{" "}
          A GenAI UGC Lead turning{" "}
          <span className="italic font-medium">attention</span> into{" "}
          <span className="inline-block">
            <span className="relative">
              demand
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                <motion.path 
                  d="M0 7 Q25 0 50 4 Q75 8 100 2" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                />
              </svg>
            </span>
          </span>
          .
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl leading-relaxed"
        >
          I build, scale, and direct UGC programs for AI and GenAI startups. 
          I've led strategy for YC-backed companies and driven 40M+ monthly reach.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
