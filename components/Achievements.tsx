"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepTime = duration / steps;
            let current = 0;
            const increment = value / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [inView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}
            {suffix}
        </span>
    );
}

export default function Achievements() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 bg-white/[0.01]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <span className="text-neon-cyan text-sm tracking-[0.2em] uppercase mb-4 block">Our Legacy</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                    IMPACT BY THE NUMBERS
                </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-neon-cyan/30 transition-all duration-300"
                    >
                        <div className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 group-hover:from-neon-cyan group-hover:to-blue-500 transition-all duration-300 mb-2">
                            <Counter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-xs md:text-sm font-sans tracking-widest text-gray-500 uppercase text-center group-hover:text-gray-300 transition-colors">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
