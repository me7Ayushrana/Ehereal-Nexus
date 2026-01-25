"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "SERVICES", href: "#services" },
    { name: "PROJECTS", href: "#projects" },
    { name: "COLLABORATE", href: "#collaborate" },
    { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="fixed top-0 left-0 w-full z-40 flex justify-center py-6 pointer-events-none"
        >
            <div
                className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-[0_0_20px_-10px_rgba(255,255,255,0.1)] hover:border-white/10 transition-colors"
            >
                {navItems.map((item, i) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="relative px-4 py-2 text-xs font-mono tracking-widest text-gray-400 hover:text-white transition-colors"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Hover Background - Liquid Effect */}
                        {hoveredIndex === i && (
                            <motion.div
                                layoutId="nav-hover"
                                className="absolute inset-0 bg-white/5 rounded-full -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}

                        {/* Active Indicator Dot */}
                        <span className={cn(
                            "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-cyan opacity-0 transition-opacity duration-300",
                            hoveredIndex === i && "opacity-100 shadow-[0_0_8px_var(--color-neon-cyan)]"
                        )} />

                        {item.name}
                    </a>
                ))}

                <div className="w-[1px] h-4 bg-white/10 mx-2" />

                <button className="px-4 py-2 rounded-full bg-white/5 text-xs text-white font-mono border border-white/5 hover:bg-neon-cyan/20 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300">
                    CONNECT
                </button>
            </div>
        </motion.nav>
    );
}
