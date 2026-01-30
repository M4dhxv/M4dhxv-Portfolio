import { motion, Variants } from "framer-motion";

const results = [
  { value: "40M+", label: "Monthly reach on Instagram (peak)", icon: "📊" },
  { value: "40M", label: "Views in a single month", icon: "👀" },
  { value: "2.2M", label: "Views in 3 days (global sprint)", icon: "⚡" },
  { value: "0→6K", label: "Follower scales in ~10 days", icon: "📈" },
  { value: "7K+", label: "Comments on a single post", icon: "💬" },
  { value: "YC", label: "Backed startup experience", icon: "🚀" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
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

const Results = () => {
  return (
    <section id="results" className="py-28 px-4">
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
            Track Record
          </motion.span>
          <h2 className="section-heading mt-3">High-Signal Results</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Proven ability to turn content into leads, comments, and demand. 
            These aren't vanity metrics — they're signals of real engagement.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
        >
          {results.map((result) => (
            <motion.div
              key={result.label}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="metric-card group cursor-default"
            >
              <motion.span 
                className="text-3xl mb-4 block"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {result.icon}
              </motion.span>
              <p className="metric-value">{result.value}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{result.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
