"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["ETHEREAL NEXUS"];

export default function Preloader() {
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = "hidden";

        const startTime = Date.now();
        const duration = 1500; // Slightly longer for smoother loading

        let animationFrameId: number;

        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = Math.min((elapsedTime / duration) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => {
                    setComplete(true);
                    document.body.style.overflow = "auto";
                }, 300);
            }
        };

        animationFrameId = requestAnimationFrame(updateProgress);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void text-white"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-orbitron font-bold tracking-[0.2em] text-center">
                            ETHEREAL <span className="text-neon-cyan">NEXUS</span>
                        </h1>
                    </motion.div>

                    {/* Minimal Progress Bar */}
                    <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="mt-4 text-[10px] font-mono tracking-widest text-gray-500">
                        INITIALIZING... {Math.round(progress)}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
