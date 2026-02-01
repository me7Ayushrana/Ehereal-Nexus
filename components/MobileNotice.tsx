"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Monitor, Smartphone } from "lucide-react";

export default function MobileNotice() {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check if already dismissed
        const dismissed = sessionStorage.getItem("mobile-notice-dismissed");
        if (!dismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("mobile-notice-dismissed", "true");
    };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[90] md:hidden flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="glass-card max-w-sm w-full p-8 rounded-2xl flex flex-col items-center text-center border border-neon-cyan/20 shadow-[0_0_30px_-5px_var(--color-neon-cyan)]"
                    >
                        <div className="mb-6 relative">
                            <Monitor size={48} className="text-neon-cyan opacity-80" />
                            <Smartphone size={24} className="text-pink-500 absolute -bottom-1 -right-2 bg-black rounded-full p-1 border border-pink-500/50" />
                        </div>

                        <h2 className="text-xl font-display font-bold text-white mb-2 tracking-wide">
                            DESKTOP RECOMMENDED
                        </h2>

                        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                            The <span className="text-neon-cyan">Ethereal Nexus</span> is a high-fidelity immersive workspace designed for larger screens.
                            <br /><br />
                            For the full experience, please access via PC.
                        </p>

                        <button
                            onClick={handleDismiss}
                            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-white hover:bg-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 w-full"
                        >
                            ENTER ANYWAY
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
