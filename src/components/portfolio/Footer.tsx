import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Name and tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Madhav Sharma
            </h3>
            <p className="text-muted-foreground text-sm">
              GenAI UGC Lead • Creative Director
            </p>
            <p className="text-muted-foreground/60 text-xs mt-4">
              Last updated January 2026
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-8"
          >
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#results" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Results
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#approach" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Approach
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:contact@madhav.com" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted-foreground/60">
            Designed with ✨ for creative impact
          </p>
          <p className="font-serif text-lg text-foreground">
            Madhav Sharma
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
