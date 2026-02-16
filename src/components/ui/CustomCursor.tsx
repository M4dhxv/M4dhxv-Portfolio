import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Initial setup
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });
        gsap.set(followerRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
        const followerXTo = gsap.quickTo(followerRef.current, "x", { duration: 0.6, ease: "power3" });
        const followerYTo = gsap.quickTo(followerRef.current, "y", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.5 });
            xTo(e.clientX);
            yTo(e.clientY);
            followerXTo(e.clientX);
            followerYTo(e.clientY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.closest(".project-card") ||
                target.classList.contains("interactive");

            if (isInteractive) {
                gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
                gsap.to(followerRef.current, {
                    scale: 3,
                    duration: 0.3,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "transparent",
                    mixBlendMode: "difference"
                });
            } else {
                gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
                gsap.to(followerRef.current, {
                    scale: 1,
                    duration: 0.3,
                    backgroundColor: "transparent",
                    borderColor: "hsl(var(--primary))",
                    mixBlendMode: "normal"
                });
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999]"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[9998]"
            />
        </>
    );
};

export default CustomCursor;
