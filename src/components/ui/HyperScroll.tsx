import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HyperScroll.css";

gsap.registerPlugin(ScrollTrigger);

interface HyperScrollProps {
    cards?: Array<{
        id: string;
        title: string;
        gridSize?: string;
        dataSize?: string;
    }>;
}

const DEFAULT_CARDS = [
    { id: "001", title: "IMPACT", gridSize: "8x8", dataSize: "45.2MB" },
    { id: "002", title: "VELOCITY", gridSize: "6x9", dataSize: "67.8MB" },
    { id: "003", title: "BRUTAL", gridSize: "7x7", dataSize: "23.4MB" },
    { id: "004", title: "SYSTEM", gridSize: "9x5", dataSize: "89.1MB" },
    { id: "005", title: "FUTURE", gridSize: "5x8", dataSize: "34.7MB" },
];

export const HyperScroll = ({ cards = DEFAULT_CARDS }: HyperScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [fps, setFps] = useState(60);
    const [velocity, setVelocity] = useState(0);
    const [coord, setCoord] = useState(0);

    useEffect(() => {
        if (!containerRef.current || !worldRef.current || !viewportRef.current) return;

        const CONFIG = {
            itemCount: cards.length,
            starCount: 150,
            zGap: 800,
            camSpeed: 1.5,
        };

        const loopSize = CONFIG.itemCount * CONFIG.zGap;
        const items: any[] = [];

        // Create items
        cards.forEach((card, i) => {
            const el = document.createElement("div");
            el.className = "hyper-item";

            const cardEl = document.createElement("div");
            cardEl.className = "hyper-card";
            cardEl.innerHTML = `
        <div class="hyper-card-header">
          <span class="hyper-card-id">ID-${card.id}</span>
          <div style="width: 10px; height: 10px; background: var(--accent);"></div>
        </div>
        <h2>${card.title}</h2>
        <div class="hyper-card-footer">
          <span>GRID: ${card.gridSize || "0x0"}</span>
          <span>DATA_SIZE: ${card.dataSize || "0MB"}</span>
        </div>
        <div style="position:absolute; bottom:2rem; right:2rem; font-size:4rem; opacity:0.1; font-weight:900;">0${i + 1}</div>
      `;
            el.appendChild(cardEl);

            const angle = (i / CONFIG.itemCount) * Math.PI * 6;
            const x = Math.cos(angle) * (window.innerWidth * 0.3);
            const y = Math.sin(angle) * (window.innerHeight * 0.3);
            const rot = (Math.random() - 0.5) * 30;

            items.push({
                el,
                type: "card",
                x,
                y,
                rot,
                baseZ: -i * CONFIG.zGap,
            });

            worldRef.current?.appendChild(el);
        });

        // Create stars
        for (let i = 0; i < CONFIG.starCount; i++) {
            const el = document.createElement("div");
            el.className = "hyper-star";
            worldRef.current?.appendChild(el);
            items.push({
                el,
                type: "star",
                x: (Math.random() - 0.5) * 3000,
                y: (Math.random() - 0.5) * 3000,
                baseZ: -Math.random() * loopSize,
            });
        }

        let mouseX = 0;
        let mouseY = 0;
        let scroll = 0;
        let currentVelocity = 0;
        let lastTime = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // GSAP ScrollTrigger to pin the section and animate through all cards
        const totalScrollDistance = CONFIG.itemCount * CONFIG.zGap * CONFIG.camSpeed;

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalScrollDistance}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                scroll = self.progress * totalScrollDistance;
                currentVelocity = self.getVelocity() / 1000;
                setVelocity(Math.abs(currentVelocity));
                setCoord(scroll);
            },
        });

        function raf(time: number) {
            // ... (rest of raf content, actually I don't need to replace it if I can target correctly)
            const delta = time - lastTime;
            lastTime = time;
            if (time % 10 < 1) setFps(Math.round(1000 / delta));

            const tiltX = mouseY * 5 - currentVelocity * 0.5;
            const tiltY = mouseX * 5;

            if (worldRef.current) {
                worldRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }

            const baseFov = 1000;
            const fov = baseFov - Math.min(Math.abs(currentVelocity) * 10, 600);
            if (viewportRef.current) {
                viewportRef.current.style.perspective = `${fov}px`;
            }

            const cameraZ = scroll;

            items.forEach((item) => {
                let relZ = item.baseZ + cameraZ;
                const modC = loopSize;
                let vizZ = ((relZ % modC) + modC) % modC;
                if (vizZ > 500) vizZ -= modC;

                let alpha = 1;
                if (vizZ < -3000) alpha = 0;
                else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
                if (vizZ > 100 && item.type !== "star") alpha = 1 - (vizZ - 100) / 400;
                if (alpha < 0) alpha = 0;

                item.el.style.opacity = alpha;

                if (alpha > 0) {
                    let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

                    if (item.type === "star") {
                        const stretch = Math.max(1, Math.min(1 + Math.abs(currentVelocity) * 0.1, 10));
                        trans += ` scale3d(1, 1, ${stretch})`;
                    } else {
                        const t = time * 0.001;
                        const float = Math.sin(t + item.x) * 10;
                        trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
                    }

                    item.el.style.transform = trans;
                }
            });

            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            trigger.kill();
        };
    }, [cards]);

    return (
        <div ref={containerRef} className="hyper-scroll-container">
            {/* Overlays */}
            <div className="hyper-scanlines"></div>
            <div className="hyper-vignette"></div>
            <div className="hyper-noise"></div>

            {/* HUD */}
            <div className="hyper-hud">
                <div className="hyper-hud-top">
                    <span>SYS.READY</span>
                    <div className="hyper-hud-line"></div>
                    <span>
                        FPS: <strong>{fps}</strong>
                    </span>
                </div>
                <div className="hyper-center-nav">
                    SCROLL VELOCITY // <strong>{velocity.toFixed(2)}</strong>
                </div>
                <div className="hyper-hud-bottom">
                    <span>
                        COORD: <strong>{coord.toFixed(0).padStart(7, "0")}</strong>
                    </span>
                    <div className="hyper-hud-line"></div>
                    <span>VER 2.0.4 [BETA]</span>
                </div>
            </div>

            {/* 3D World */}
            <div className="hyper-viewport" ref={viewportRef}>
                <div className="hyper-world" ref={worldRef}></div>
            </div>
        </div>
    );
};

export default HyperScroll;
