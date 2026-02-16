"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { fluidFragmentShader, fluidVertexShader } from "./shaders";

const FluidBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SCENE SETUP ---
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // --- GEOMETRY & MATERIAL ---
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Initial theme check
        const initialDark = document.documentElement.classList.contains('dark');

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            iTheme: { value: initialDark ? 0.0 : 1.0 } // 0: Dark, 1: Light
        };

        const material = new THREE.ShaderMaterial({
            vertexShader: fluidVertexShader,
            fragmentShader: fluidFragmentShader,
            uniforms: uniforms,
            transparent: true,
            depthWrite: false,
            depthTest: false
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // --- ANIMATION LOOP ---
        let animationId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            uniforms.iTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // --- RESIZE HANDLER ---
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            uniforms.iResolution.value.set(width, height);
        };
        window.addEventListener("resize", handleResize);

        // --- THEME OBSERVER (Sync with global theme) ---
        const updateTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
            if (uniforms) uniforms.iTheme.value = isDark ? 0.0 : 1.0;
        };

        // Initial sync
        updateTheme();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updateTheme();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // --- CLEANUP ---
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            observer.disconnect();

            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);



    return (
        <>
            <div
                ref={containerRef}
                className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-0 transition-opacity duration-500"
                style={{ background: theme === 'light' ? '#fff' : '#000' }}
            />


        </>
    );
};

export default FluidBackground;
