import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Footer = () => {
  return (
    <footer className="py-20 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row justify-between items-start gap-12"
        >
          {/* Name and tagline */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Madhav Sharma
            </h3>
            <p className="text-muted-foreground text-base">
              GenAI UGC Lead • Creative Director
            </p>
            <p className="text-muted-foreground/50 text-sm mt-5">
              Last updated January 2026
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-12"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3">
                {[
                  { href: "#hero", label: "Home" },
                  { href: "#results", label: "Results" },
                  { href: "#experience", label: "Experience" },
                  { href: "#approach", label: "Approach" },
                ].map((link) => (
                  <li key={link.href}>
                    <motion.a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-3">
                {[
                  { href: "mailto:contact@madhav.com", label: "Email" },
                  { href: "#", label: "LinkedIn" },
                  { href: "#", label: "Instagram" },
                ].map((link) => (
                  <li key={link.label}>
                    <motion.a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground/50">
            Designed with ✨ for creative impact
          </p>
          <motion.p 
            className="font-serif text-xl text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            Madhav Sharma
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
