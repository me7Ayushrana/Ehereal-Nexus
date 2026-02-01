"use client";

import { motion, Variants } from "framer-motion";
import HoloShape from "./HoloShape";
import VoidSphere from "./VoidSphere";
import GlassCard from "./GlassCard";
import MagneticButton from "./MagneticButton";

export default function Hero() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    const scrollToSection = (id: string, position: ScrollLogicalPosition = "start") => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: position });
        }
    };

    return (
        <section className="relative h-[100dvh] md:h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <VoidSphere />
            <HoloShape />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-4xl w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="flex justify-center">
                    <div className="glass-panel rounded-full px-5 py-2 mb-8 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_var(--color-neon-cyan)]" />
                        <span className="text-neon-cyan text-[10px] sm:text-xs tracking-[0.2em] font-mono">SKILLORA IS NOW</span>
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-8"
                >
                    ETHEREAL <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-purple-500 text-glow animate-shimmer-gold pb-2 block">NEXUS</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed border-l border-white/5 pl-6"
                >
                    End-to-end solutions for <span className="text-neon-cyan text-glow">Hardware, IoT, & AI</span>.
                    <br className="hidden md:block" />
                    We empower students and developers to build the impossible.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <GlassCard
                        variant="default"
                        className="cursor-pointer px-8 py-4 bg-white/5"
                        onClick={() => scrollToSection('galaxy')}
                    >
                        <span className="font-mono text-sm tracking-widest text-white group-hover:text-neon-cyan transition-colors">
                            EXPLORE PROJECTS
                        </span>
                    </GlassCard>

                    <MagneticButton
                        className="px-8 py-4 text-sm font-mono tracking-widest text-gray-500 hover:text-white transition-all duration-300 uppercase border border-transparent hover:border-white/20 rounded-full active:scale-95 hover:bg-white/5"
                        onClick={() => scrollToSection('contact')}
                    >
                        Join The Nexus
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-10 hidden md:block z-10">
                <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-neon-cyan/50 to-transparent" />
                <p className="mt-4 font-mono text-[10px] text-neon-cyan/50 tracking-widest -rotate-90 origin-top-left translate-y-full">SCROLL_DETECT</p>
            </div>

            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden md:flex flex-col gap-4 z-10">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-1 h-1 rounded-full transition-all duration-500 ${i === 1 ? 'bg-neon-cyan shadow-[0_0_10px_var(--color-neon-cyan)] scale-150' : 'bg-white/10'}`} />
                ))}
            </div>

            {/* Bottom Glass Fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/80 to-transparent z-[1]" />
        </section>
    );
}
