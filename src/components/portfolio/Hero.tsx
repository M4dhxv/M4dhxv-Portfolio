import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.5 + i * 0.08,
    },
  }),
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center px-4 pt-24 pb-20">
      {/* Spline Traffic Light */}
      <div className="w-full max-w-md h-[300px] md:h-[400px] mb-8">
        <iframe 
          src='https://my.spline.design/trafficlight-SwC3ZMB6hYzA5vjumfKVi4Z6/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-auto"
          title="Traffic Light 3D"
        />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="status-badge mb-10"
        >
          <span className="status-dot" />
          <span className="text-muted-foreground text-sm">Open for UGC & Creative Direction roles</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center max-w-5xl leading-[1.1] mb-8 tracking-tight"
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
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-14 leading-relaxed"
        >
          I build, scale, and direct UGC programs for AI and GenAI startups. 
          I've led strategy for YC-backed companies and driven 40M+ monthly reach.
        </motion.p>

        {/* Bento Grid Hero Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full max-w-4xl">
          {/* Instagram Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              rotate: -3, 
              scale: 1.04,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="col-span-1 sticky-note sticky-note-yellow p-5"
            style={{ transform: "rotate(-2deg)" }}
          >
            <span className="text-3xl mb-3 block">📸</span>
            <p className="font-medium text-foreground/90 text-sm">Instagram & TikTok</p>
            <p className="text-xs text-foreground/60 mt-1">Primary Platforms</p>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              rotate: 3, 
              scale: 1.04,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="col-span-1 sticky-note sticky-note-green p-5"
            style={{ transform: "rotate(1deg)" }}
          >
            <p className="font-serif text-3xl font-bold text-foreground/90">40M+</p>
            <p className="text-xs text-foreground/60 mt-1">Monthly Reach (Peak)</p>
          </motion.div>

          {/* YC Card */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              rotate: -2, 
              scale: 1.04,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="col-span-1 sticky-note sticky-note-pink p-5"
            style={{ transform: "rotate(2deg)" }}
          >
            <span className="text-2xl mb-2 block">🚀</span>
            <p className="font-medium text-foreground/90 text-sm">YC-Backed</p>
            <p className="text-xs text-foreground/60 mt-1">Startup Experience</p>
          </motion.div>

          {/* Speed Card */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              rotate: 2, 
              scale: 1.04,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="col-span-1 sticky-note sticky-note-blue p-5"
            style={{ transform: "rotate(-1deg)" }}
          >
            <p className="font-serif text-3xl font-bold text-foreground/90">10 days</p>
            <p className="text-xs text-foreground/60 mt-1">0 → 6K followers</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
