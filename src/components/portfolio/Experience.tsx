import { motion, Variants } from "framer-motion";

const experiences = [
  {
    role: "UGC Lead & Creative Director",
    company: "YC-Backed AI Startup (Mila)",
    period: "2025",
    type: "Remote",
    highlights: [
      "Promoted from content creator to UGC Lead / Creative Director",
      "Scaled new Instagram page to ~6,000 followers in ~10 days",
      "Single post generated ~7,000 comments requesting a guide",
      "Implemented DM automation to convert engagement into leads",
    ],
    color: "sticky-yellow",
  },
  {
    role: "Creative Director",
    company: "Slay School (YC-Backed)",
    period: "2025",
    type: "Remote",
    highlights: [
      "Directed short-form content and UGC strategy",
      "Defined creative frameworks and scripts",
      "Focused on creator-native storytelling",
    ],
    color: "sticky-green",
  },
  {
    role: "UGC Creator & Growth Strategist",
    company: "Parrot AI",
    period: "~1 year",
    type: "Remote",
    highlights: [
      "Created GenAI-focused short-form content",
      "Delivered strong results from first month",
      "Built deep intuition around GenAI user psychology",
    ],
    color: "sticky-pink",
  },
  {
    role: "UGC Creator",
    company: "Yapper (AI)",
    period: "2024",
    type: "Remote",
    highlights: [
      "Produced creator-led AI content optimized for virality",
      "Focused on simple explanations, strong hooks, and POV formats",
    ],
    color: "sticky-blue",
  },
  {
    role: "Global Creator Sprint",
    company: "DualBits",
    period: "August 2024",
    type: "Competition",
    highlights: [
      "Ranked 41st globally in high-competition sprint",
      "Generated ~2.2M views in 3 days",
      "Fast-paced environment emphasizing rapid testing",
    ],
    color: "sticky-yellow",
  },
  {
    role: "AI Influencer Page",
    company: "Self-Initiated Project",
    period: "December 2025",
    type: "Personal",
    highlights: [
      "Built page to ~3,800 followers in ~10 days",
      "Tested GenAI narratives and product-style storytelling",
    ],
    color: "sticky-green",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
};

const Experience = () => {
  return (
    <section id="experience" className="py-28 px-4">
      <div className="max-w-5xl mx-auto">
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
            Career
          </motion.span>
          <h2 className="section-heading mt-3">Work Experience</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              variants={cardVariants}
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="bento-card relative overflow-hidden group"
            >
              {/* Decorative tape */}
              <motion.div 
                className="absolute -top-2 left-8 w-16 h-6 rounded-sm opacity-60"
                initial={{ rotate: -12, scale: 0.8 }}
                whileInView={{ rotate: -8, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{
                  background: "linear-gradient(90deg, hsl(350 60% 85% / 0.8) 0%, hsl(350 60% 90% / 0.6) 100%)",
                }}
              />
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium bg-${exp.color}`}>
                      {exp.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground leading-tight">{exp.role}</h3>
                  <p className="text-muted-foreground mb-5 text-base">{exp.company}</p>
                  
                  <ul className="space-y-2.5">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                      >
                        <span className="text-primary mt-0.5 text-lg">•</span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
