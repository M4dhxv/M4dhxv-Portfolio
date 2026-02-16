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

    // Explicit Toggle Function (updates DOM, Observer syncs state)
    const toggleTheme = (newTheme: 'light' | 'dark') => {
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <>
            <div
                ref={containerRef}
                className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-0 transition-opacity duration-500"
                style={{ background: theme === 'light' ? '#fff' : '#000' }}
            />

            {/* Theme Switcher - Restored & Repositioned to Bottom Center */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <fieldset className="switcher relative flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm transition-all duration-300">
                    <legend className="sr-only">Choose theme</legend>
                    <label className="switcher__option relative z-10 block cursor-pointer transition-all hover:scale-110">
                        <input
                            className="sr-only"
                            type="radio"
                            name="theme"
                            value="light"
                            checked={theme === 'light'}
                            onChange={() => toggleTheme('light')}
                        />
                        <svg className={`w-6 h-6 transition-colors duration-300 ${theme === 'light' ? 'text-yellow-400' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
                            <path fill="currentColor" fillRule="evenodd" d="M18 12a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd" />
                            <path fill="currentColor" d="M17 6.038a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0v-3ZM24.244 7.742a1 1 0 1 1 1.618 1.176L24.1 11.345a1 1 0 1 1-1.618-1.176l1.763-2.427ZM29.104 13.379a1 1 0 0 1 .618 1.902l-2.854.927a1 1 0 1 1-.618-1.902l2.854-.927ZM29.722 20.795a1 1 0 0 1-.619 1.902l-2.853-.927a1 1 0 1 1 .618-1.902l2.854.927ZM25.862 27.159a1 1 0 0 1-1.618 1.175l-1.763-2.427a1 1 0 1 1 1.618-1.175l1.763 2.427ZM19 30.038a1 1 0 0 1-2 0v-3a1 1 0 1 1 2 0v3ZM11.755 28.334a1 1 0 0 1-1.618-1.175l1.764-2.427a1 1 0 1 1 1.618 1.175l-1.764 2.427ZM6.896 22.697a1 1 0 1 1-.618-1.902l2.853-.927a1 1 0 1 1 .618 1.902l-2.853.927ZM6.278 15.28a1 1 0 1 1 .618-1.901l2.853.927a1 1 0 1 1-.618 1.902l-2.853-.927ZM10.137 8.918a1 1 0 0 1 1.618-1.176l1.764 2.427a1 1 0 0 1-1.618 1.176l-1.764-2.427Z" />
                        </svg>
                    </label>
                    <label className="switcher__option relative z-10 block cursor-pointer transition-all hover:scale-110 ml-4">
                        <input
                            className="sr-only"
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={theme === 'dark'}
                            onChange={() => toggleTheme('dark')}
                        />
                        <svg className={`w-6 h-6 transition-colors duration-300 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
                            <path fill="currentColor" d="M12.5 8.473a10.968 10.968 0 0 1 8.785-.97 7.435 7.435 0 0 0-3.737 4.672l-.09.373A7.454 7.454 0 0 0 28.732 20.4a10.97 10.97 0 0 1-5.232 7.125l-.497.27c-5.014 2.566-11.175.916-14.234-3.813l-.295-.483C5.53 18.403 7.13 11.93 12.017 8.77l.483-.297Zm4.234.616a8.946 8.946 0 0 0-2.805.883l-.429.234A9 9 0 0 0 10.206 22.5l.241.395A9 9 0 0 0 22.5 25.794l.416-.255a8.94 8.94 0 0 0 2.167-1.99 9.433 9.433 0 0 1-2.782-.313c-5.043-1.352-8.036-6.535-6.686-11.578l.147-.491c.242-.745.573-1.44.972-2.078Z" />
                        </svg>
                    </label>

                    {/* Sliding Indicator */}
                    <div
                        className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white/20 rounded-full transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'}`}
                    ></div>
                </fieldset>
            </div>
        </>
    );
};

export default FluidBackground;
