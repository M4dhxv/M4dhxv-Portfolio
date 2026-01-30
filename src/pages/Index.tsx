import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import Results from "@/components/portfolio/Results";
import Experience from "@/components/portfolio/Experience";
import Approach from "@/components/portfolio/Approach";
import Availability from "@/components/portfolio/Availability";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Results />
        <Experience />
        <Approach />
        <Availability />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
