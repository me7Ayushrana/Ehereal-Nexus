"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ConnectModal from "./ConnectModal";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "SERVICES", href: "#services" },
    { name: "PROJECTS", href: "#galaxy" },
    { name: "COLLABORATE", href: "#collaborate" },
    { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isConnectOpen, setIsConnectOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="fixed top-0 left-0 w-full z-40 flex justify-center py-6 pointer-events-none"
            >
                {/* Desktop Nav */}
                <div
                    className="hidden md:flex pointer-events-auto items-center gap-2 px-4 py-3 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-[0_0_20px_-10px_rgba(255,255,255,0.1)] hover:border-white/10 transition-colors"
                >
                    {navItems.map((item, i) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
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

                    <button
                        onClick={() => setIsConnectOpen(true)}
                        className="px-4 py-2 rounded-full bg-white/5 text-xs text-white font-mono border border-white/5 hover:bg-neon-cyan/20 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                    >
                        CONNECT
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden pointer-events-auto absolute top-6 right-6 z-50">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="text-2xl font-display font-bold tracking-widest text-white hover:text-neon-cyan transition-colors"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsConnectOpen(true);
                                }}
                                className="mt-8 px-8 py-3 rounded-full bg-neon-cyan/10 text-neon-cyan font-mono border border-neon-cyan/50"
                            >
                                CONNECT
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ConnectModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
        </>
    );
}
