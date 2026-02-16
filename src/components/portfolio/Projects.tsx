import { HyperScroll } from "@/components/ui/HyperScroll";

const Projects = () => {
    const projects = [
        {
            id: "001",
            title: "YC STARTUP",
            gridSize: "40M+",
            dataSize: "150 CREATORS"
        },
        {
            id: "002",
            title: "GENAI TOOLS",
            gridSize: "2M+",
            dataSize: "150K ENGAGE"
        },
        {
            id: "003",
            title: "UGC PLATFORM",
            gridSize: "10+",
            dataSize: "BRANDS"
        },
        {
            id: "004",
            title: "ONBOARDING",
            gridSize: "65%",
            dataSize: "FASTER"
        },
        {
            id: "005",
            title: "VIRAL ENGINE",
            gridSize: "5 HITS",
            dataSize: "1M+ VIEWS"
        },
        {
            id: "006",
            title: "CONTENT AI",
            gridSize: "3X",
            dataSize: "EFFICIENCY"
        },
        {
            id: "007",
            title: "ANALYTICS",
            gridSize: "REAL-TIME",
            dataSize: "INSIGHTS"
        },
        {
            id: "008",
            title: "AUTOMATION",
            gridSize: "24/7",
            dataSize: "WORKFLOW"
        },
    ];

    return <HyperScroll cards={projects} />;
};

export default Projects;
