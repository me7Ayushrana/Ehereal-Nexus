"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Hardware Projects", value: 200, suffix: "+" },
    { label: "Research Papers", value: 500, suffix: "+" },
    { label: "M.Tech & PhD Thesis", value: 150, suffix: "+" },
    { label: "CAD Designs", value: 150, suffix: "+" },
    { label: "Pro Websites", value: 50, suffix: "+" },
    { label: "Project Reports", value: 50, suffix: "+" },
    { label: "Publications", value: 30, suffix: "+" },
    { label: "Book Chapters", value: 15, suffix: "+" },
];
export default function Achievements() {
    return (
        <section id="achievements" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
            {/* Background Glow */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_#00f0ff]" />
                    <span className="text-neon-cyan text-xs tracking-[0.2em] uppercase font-mono">Our Legacy</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                    IMPACT BY THE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-purple-500 text-glow">NUMBERS</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group glass-card p-8 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            <div className="text-4xl md:text-5xl font-mono font-bold text-white/90 group-hover:text-white transition-all duration-300 mb-3 group-hover:text-glow">
                                {stat.value}<span className="text-neon-cyan/60 group-hover:text-neon-cyan">{stat.suffix}</span>
                            </div>
                            <div className="h-px w-8 bg-white/10 mx-auto mb-3 group-hover:w-full group-hover:bg-neon-cyan/30 transition-all duration-500" />
                            <p className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-gray-400 uppercase text-center group-hover:text-neon-cyan transition-colors">
                                {stat.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
