import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const MarqueeText = () => {
    const container = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // Seamless loop animation: move from 0% to -50% (since we have 2 copies)
        const loop = gsap.to(wrapper, {
            xPercent: -50,
            repeat: -1,
            duration: 40,
            ease: "linear",
        });
    }, { scope: container });

    const text = "Open to Relocation • Available for Full-time Opportunities • Based in India • ";

    return (
        <div ref={container} className="relative overflow-hidden bg-primary text-primary-foreground py-6 border-y border-primary-foreground/10 select-none">
            {/* 
        Wrapper containing two identical sets of content.
        We animate this wrapper to xPercent: -50.
      */}
            <div ref={wrapperRef} className="flex w-fit whitespace-nowrap will-change-transform">
                {/* Set 1 */}
                <div className="flex">
                    {[...Array(4)].map((_, i) => (
                        <div key={`set1-${i}`} className="flex items-center gap-8 mx-8">
                            <span className="text-2xl font-bold uppercase tracking-widest opacity-80">
                                {text}
                            </span>
                            <span className="text-2xl">✨</span>
                        </div>
                    ))}
                </div>
                {/* Set 2 (Duplicate) */}
                <div className="flex">
                    {[...Array(4)].map((_, i) => (
                        <div key={`set2-${i}`} className="flex items-center gap-8 mx-8">
                            <span className="text-2xl font-bold uppercase tracking-widest opacity-80">
                                {text}
                            </span>
                            <span className="text-2xl">✨</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarqueeText;
