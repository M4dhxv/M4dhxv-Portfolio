import { motion } from "framer-motion";

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

const Approach = () => {
  return (
    <section id="approach" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Philosophy</span>
          <h2 className="section-heading mt-2">How I Approach UGC for AI Products</h2>
        </motion.div>

        {/* Approach Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bento-card"
            >
              <span className="text-4xl mb-4 block">{approach.icon}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{approach.title}</h3>
              <p className="text-muted-foreground">{approach.description}</p>
            </motion.div>
          ))}
        </div>

        {/* What I Bring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bento-card relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div 
            className="absolute -top-3 right-12 w-20 h-7 rounded-sm opacity-60"
            style={{
              background: "linear-gradient(90deg, hsl(145 60% 75% / 0.8) 0%, hsl(145 60% 80% / 0.6) 100%)",
              transform: "rotate(5deg)",
            }}
          />
          
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
            What I Bring to Early-Stage Teams
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {strengths.map((strength, index) => (
              <motion.div
                key={strength}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground/90">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Approach;
