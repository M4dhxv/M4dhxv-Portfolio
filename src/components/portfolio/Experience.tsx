import { motion } from "framer-motion";

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
    color: "sticky-note-yellow",
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
    color: "sticky-note-green",
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
    color: "sticky-note-pink",
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
    color: "sticky-note-blue",
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
    color: "sticky-note-yellow",
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
    color: "sticky-note-green",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Career</span>
          <h2 className="section-heading mt-2">Work Experience</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bento-card relative overflow-hidden"
            >
              {/* Decorative tape */}
              <div 
                className="absolute -top-2 left-8 w-16 h-6 rounded-sm opacity-70"
                style={{
                  background: "linear-gradient(90deg, hsl(350 60% 85% / 0.8) 0%, hsl(350 60% 90% / 0.6) 100%)",
                  transform: "rotate(-8deg)",
                }}
              />
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${exp.color}`}>
                      {exp.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-muted-foreground mb-4">{exp.company}</p>
                  
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-primary mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
