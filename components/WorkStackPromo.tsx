"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function WorkStackPromo() {
    return (
        <section className="w-full py-20 px-4 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-4xl"
            >
                {/* Decorative Glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl opacity-50" />

                <div className="glass-panel relative rounded-2xl p-8 md:p-12 overflow-hidden border border-white/10 group">
                    {/* Background sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="space-y-4 max-w-lg">
                            <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/5 text-[10px] tracking-[0.2em] text-white/80 uppercase backdrop-blur-md">
                                Productivity Redefined
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                                WorkStack <span className="shimmer-gold">AI</span>
                            </h2>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                                Unlock your full potential with our personal workspace solution.
                                <br className="hidden md:block" />
                                Streamline your tasks, manage projects, and <span className="text-white font-medium">increase your productivity</span> effortlessly.
                            </p>
                        </div>

                        <motion.a
                            href="https://workstack-ai.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group/btn relative px-8 py-3 bg-white text-black rounded-full font-bold text-sm tracking-wide overflow-hidden flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)] transition-all duration-300"
                        >
                            <span className="relative z-10">START NOW</span>
                            <ArrowUpRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
