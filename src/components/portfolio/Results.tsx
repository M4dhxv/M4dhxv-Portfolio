import { motion } from "framer-motion";

const metricCards = [
  { value: "40M+", label: "Monthly reach on Instagram (peak)" },
  { value: "40M", label: "Views in a single month" },
  { value: "2.2M", label: "Views in 3 days (global sprint)" },
  { value: "0 → 6K", label: "Follower scales in ~10 days" },
  { value: "7K+", label: "Comments on a single post" },
  { value: "YC", label: "Backed startup experience" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

const GlassCard = ({ value, label, index }: { value: string; label: string; index: number }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ scale: 1.02, y: -4 }}
    className="glass-card p-5 rounded-2xl cursor-default"
  >
    <div className="metric-value text-2xl md:text-3xl mb-1">{value}</div>
    <p className="text-muted-foreground text-sm leading-snug">{label}</p>
  </motion.div>
);

const Results = () => {
  const leftCards = metricCards.slice(0, 3);
  const rightCards = metricCards.slice(3, 6);

  return (
    <section id="results" className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring",
            stiffness: 80,
            damping: 15,
          }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-primary uppercase tracking-widest"
          >
            Track Record
          </motion.span>
          <h2 className="section-heading mt-3">High-Signal Results</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Proven ability to turn content into leads, comments, and demand. 
            These aren't vanity metrics — they're signals of real engagement.
          </p>
        </motion.div>

        {/* Cards + Cat Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,400px)_1fr] gap-6 lg:gap-8 items-center">
          {/* Left Cards */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            {leftCards.map((card, i) => (
              <GlassCard key={card.value} value={card.value} label={card.label} index={i} />
            ))}
          </div>

          {/* Center Cat Spline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: 0.2
            }}
            className="relative aspect-square min-h-[300px] md:min-h-[400px] order-1 lg:order-2"
          >
            <iframe 
              src='https://my.spline.design/robotcat-2yNAehQ7frY0F2zjrX3mFbls/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="absolute inset-0 pointer-events-auto"
              title="Interactive Robot Cat"
              loading="lazy"
              style={{ background: 'transparent' }}
            />
          </motion.div>

          {/* Right Cards */}
          <div className="flex flex-col gap-4 order-3">
            {rightCards.map((card, i) => (
              <GlassCard key={card.value} value={card.value} label={card.label} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
