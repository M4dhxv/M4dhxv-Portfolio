import { motion, Variants } from "framer-motion";

const approaches = [
  {
    title: "Human Hooks First",
    description: "Start with human hooks, not product pitches. Anchor content in relatable pain points and curiosity.",
    icon: "🎯",
  },
  {
    title: "Clear Transformation",
    description: "Show clear before vs after without feeling like an ad. Let the value speak for itself.",
    icon: "✨",
  },
  {
    title: "Aggressive Iteration",
    description: "Iterate aggressively based on retention and comments. Data drives decisions, not assumptions.",
    icon: "🔄",
  },
  {
    title: "Distribution Mindset",
    description: "Treat UGC as a distribution system, not just content. Build for reach AND conversion.",
    icon: "📡",
  },
];

const strengths = [
  "Creator who can also lead and direct",
  "Strong taste + execution speed",
  "Comfort working with early-stage products",
  "Product-feedback mindset alongside content creation",
  "Obsession with performance, not vanity",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Approach = () => {
  return (
    <section id="approach" className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring",
            stiffness: 80,
            damping: 15,
          }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-primary uppercase tracking-widest"
          >
            Philosophy
          </motion.span>
          <h2 className="section-heading mt-3">How I Approach UGC for AI Products</h2>
        </motion.div>

        {/* Approach Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          {approaches.map((approach) => (
            <motion.div
              key={approach.title}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="bento-card group cursor-default"
            >
              <motion.span 
                className="text-4xl mb-5 block"
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {approach.icon}
              </motion.span>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3 leading-tight">{approach.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{approach.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* What I Bring */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ 
            type: "spring",
            stiffness: 80,
            damping: 14,
          }}
          className="bento-card relative overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-3 right-12 w-20 h-7 rounded-sm opacity-50"
            initial={{ rotate: 10, scale: 0.8 }}
            whileInView={{ rotate: 5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              background: "linear-gradient(90deg, hsl(145 60% 75% / 0.8) 0%, hsl(145 60% 80% / 0.6) 100%)",
            }}
          />
          
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8 leading-tight">
            What I Bring to Early-Stage Teams
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-5">
            {strengths.map((strength, index) => (
              <motion.div
                key={strength}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: 0.2 + index * 0.08 
                }}
                className="flex items-center gap-4 group"
              >
                <motion.div 
                  className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0"
                  whileHover={{ scale: 1.4 }}
                />
                <span className="text-foreground/90 text-base leading-relaxed">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Approach;
