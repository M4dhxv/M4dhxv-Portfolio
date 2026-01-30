import { motion } from "framer-motion";

const openTo = [
  { label: "UGC Creation", icon: "🎬" },
  { label: "Creative Direction & Strategy", icon: "🎯" },
  { label: "Early-Stage Experimentation", icon: "🧪" },
  { label: "Long-Term Collaboration", icon: "🤝" },
];

const Availability = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bento-card text-center relative overflow-hidden"
        >
          {/* Decorative sticky notes in corners */}
          <div 
            className="absolute -top-4 -left-4 w-24 h-24 rounded-sm opacity-40"
            style={{
              background: "hsl(var(--sticky-yellow))",
              transform: "rotate(-12deg)",
            }}
          />
          <div 
            className="absolute -bottom-4 -right-4 w-20 h-20 rounded-sm opacity-40"
            style={{
              background: "hsl(var(--sticky-pink))",
              transform: "rotate(8deg)",
            }}
          />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Opportunities
            </motion.div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Let's Create Something Together
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              I operate as an owner, not just a creator — combining execution speed, taste, and strategy.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {openTo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-xl bg-secondary/50 border border-border"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <p className="text-sm text-foreground/80">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="mailto:contact@madhav.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              <span>Get in Touch</span>
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Availability;
