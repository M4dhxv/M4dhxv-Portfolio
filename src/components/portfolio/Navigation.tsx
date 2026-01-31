import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "results", "experience", "approach"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "results", label: "Results" },
    { id: "experience", label: "Experience" },
    { id: "approach", label: "Approach" },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="glass-nav flex items-center gap-1 px-2 py-2 rounded-full">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSection === item.id 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            {item.label}
          </motion.button>
        ))}
      </nav>
      <motion.a
        href="mailto:contact@madhav.com"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ 
          scale: 1.03,
        }}
        whileTap={{ scale: 0.97 }}
        className="glass-nav ml-3 px-5 py-2 rounded-full text-sm font-medium hidden sm:flex items-center text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
      >
        Get in Touch
      </motion.a>
    </motion.header>
  );
};

export default Navigation;
