"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

// Type definition based on the projects array structure
type Project = typeof projects[0];

export default function HolographicCard({ project, index }: { project: Project, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group w-full h-[450px] cursor-pointer"
        >
            {/* Holographic Frame */}
            <div
                className="absolute inset-0 border border-neon-cyan/30 bg-void/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.1)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:border-neon-cyan/60"
                style={{ transform: "translateZ(0px)" }}
            >
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_4px]" />

                {/* Image Container */}
                <div className="relative h-[60%] w-full overflow-hidden flex items-center justify-center p-4">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Data Panel */}
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-black/50 border-t border-neon-cyan/20 p-6 flex flex-col justify-between"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <div>
                        <p className="text-neon-cyan text-[10px] font-mono tracking-widest mb-1">{project.category}</p>
                        <h3 className="text-white text-xl font-orbitron font-bold tracking-wide">{project.title}</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-mono text-gray-400">
                        {Object.entries(project.stats).map(([key, value]) => (
                            <div key={key} className="flex flex-col border-l border-white/10 pl-2">
                                <span className="uppercase text-white/50">{key}</span>
                                <span className="text-neon-cyan">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />

        </motion.div>
    );
}
