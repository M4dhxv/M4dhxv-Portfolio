import { motion } from "framer-motion";

const results = [
  { value: "40M+", label: "Monthly reach on Instagram (peak)", icon: "📊" },
  { value: "40M", label: "Views in a single month", icon: "👀" },
  { value: "2.2M", label: "Views in 3 days (global sprint)", icon: "⚡" },
  { value: "0→6K", label: "Follower scales in ~10 days", icon: "📈" },
  { value: "7K+", label: "Comments on a single post", icon: "💬" },
  { value: "YC", label: "Backed startup experience", icon: "🚀" },
];

const Results = () => {
  return (
    <section id="results" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Track Record</span>
          <h2 className="section-heading mt-2">High-Signal Results</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proven ability to turn content into leads, comments, and demand. 
            These aren't vanity metrics — they're signals of real engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="metric-card"
            >
              <span className="text-3xl mb-3 block">{result.icon}</span>
              <p className="metric-value">{result.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{result.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
