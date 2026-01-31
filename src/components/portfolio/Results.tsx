import { motion } from "framer-motion";

const Results = () => {
  return (
    <section id="results" className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring",
            stiffness: 80,
            damping: 15,
          }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-primary uppercase tracking-widest"
          >
            Track Record
          </motion.span>
          <h2 className="section-heading mt-3">High-Signal Results</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Proven ability to turn content into leads, comments, and demand. 
            These aren't vanity metrics — they're signals of real engagement.
          </p>
        </motion.div>

        {/* Spline 3D Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: 0.2
          }}
          className="relative w-full aspect-[16/9] md:aspect-[2/1] lg:aspect-[2.5/1] min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden"
        >
          <iframe 
            src='https://my.spline.design/3dcardsblurcopycopy-azWWxWDMlwpHGwWzcwXiOyap-yoO/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="absolute inset-0 pointer-events-auto"
            title="High-Signal Results 3D Cards"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
