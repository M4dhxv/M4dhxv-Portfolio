import { motion } from "framer-motion";

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="nav-pill flex items-center gap-1">
        <button
          onClick={() => scrollToSection("hero")}
          className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection("results")}
          className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          Results
        </button>
        <button
          onClick={() => scrollToSection("experience")}
          className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          Experience
        </button>
        <button
          onClick={() => scrollToSection("approach")}
          className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          Approach
        </button>
      </nav>
      <motion.a
        href="mailto:contact@madhav.com"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cta-button ml-4 hidden sm:block"
      >
        Get in Touch
      </motion.a>
    </motion.header>
  );
};

export default Navigation;
