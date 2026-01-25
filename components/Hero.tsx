"use client";

import { motion, Variants } from "framer-motion";
import HoloShape from "./HoloShape";
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

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <HoloShape />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-4xl w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <span className="inline-block py-1 px-3 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
                        SKILLORA IS NOW
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6"
                >
                    ETHEREAL <br />
                    <span className="animate-shimmer-gold text-transparent text-6xl md:text-8xl">NEXUS</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    End-to-end solutions for <span className="text-neon-cyan">Hardware, IoT, & AI</span>.
                    <br className="hidden md:block" />
                    We empower students and developers to build the impossible.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <GlassCard className="group cursor-pointer px-8 py-4 bg-white/5 border-neon-cyan/20 hover:bg-neon-cyan/10">
                        <span className="font-mono text-sm tracking-widest group-hover:text-neon-cyan transition-colors">
                            EXPLORE PROJECTS
                        </span>
                    </GlassCard>

                    <MagneticButton className="px-8 py-4 text-sm font-mono tracking-widest text-gray-500 hover:text-white transition-colors uppercase border border-transparent hover:border-white/20 rounded-full">
                        Join The Nexus
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-10 hidden md:block">
                <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-neon-cyan/50 to-transparent" />
                <p className="mt-4 font-mono text-xs text-gray-600 -rotate-90 origin-top-left translate-y-full">SCROLL_DETECT</p>
            </div>

            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden md:flex flex-col gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-neon-cyan shadow-[0_0_10px_var(--color-neon-cyan)]' : 'bg-gray-800'}`} />
                ))}
            </div>
        </section>
    );
}
