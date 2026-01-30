import { motion, Variants } from "framer-motion";

const openTo = [
  { label: "UGC Creation", icon: "🎬" },
  { label: "Creative Direction & Strategy", icon: "🎯" },
  { label: "Early-Stage Experimentation", icon: "🧪" },
  { label: "Long-Term Collaboration", icon: "🤝" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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

const Availability = () => {
  return (
    <section className="py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring",
            stiffness: 70,
            damping: 14,
          }}
          className="bento-card text-center relative overflow-hidden"
        >
          {/* Decorative sticky notes in corners */}
          <motion.div 
            className="absolute -top-6 -left-6 w-28 h-28 rounded-sm opacity-30"
            initial={{ rotate: -20, scale: 0.8 }}
            whileInView={{ rotate: -12, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              background: "hsl(var(--sticky-yellow))",
            }}
          />
          <motion.div 
            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-sm opacity-30"
            initial={{ rotate: 15, scale: 0.8 }}
            whileInView={{ rotate: 8, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              background: "hsl(var(--sticky-pink))",
            }}
          />
          
          <div className="relative z-10 py-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Opportunities
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-5 leading-tight"
            >
              Let's Create Something Together
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg leading-relaxed"
            >
              I operate as an owner, not just a creator — combining execution speed, taste, and strategy.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            >
              {openTo.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -4,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="p-5 rounded-xl bg-secondary/50 border border-border group cursor-default"
                >
                  <motion.span 
                    className="text-2xl mb-3 block"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.span>
                  <p className="text-sm text-foreground/80 leading-snug">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="mailto:contact@madhav.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 12px 40px -8px hsl(var(--primary) / 0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              className="cta-button inline-flex items-center gap-3 text-lg px-10 py-5"
            >
              <span>Get in Touch</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Availability;
