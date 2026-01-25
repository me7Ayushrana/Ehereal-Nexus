"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import HolographicCard from "@/components/HolographicCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
    return (
        <section className="min-h-screen bg-void py-24 px-6 md:px-20 overflow-hidden relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto mb-16 relative z-10">
                <Link href="/" className="inline-flex items-center text-neon-cyan/50 hover:text-neon-cyan mb-8 transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    BACK TO NEXUS
                </Link>

                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-4"
                >
                    FULL PROJECT <span className="text-neon-cyan">ARCHIVES</span>
                </motion.h2>
                <div className="h-1 bg-neon-cyan w-[200px] mb-8" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 text-gray-400 font-mono">
                    <p className="max-w-xl text-sm md:text-base">
                        // ACCESSING DEEP STORAGE...<br />
                        // RETRIEVING ALL CAD SCHEMATICS.<br />
                    </p>
                    <div className="text-xs md:text-sm text-right opacity-70">
                        TOTAL RECORDS: <span className="text-neon-cyan">{projects.length}</span><br />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                {projects.map((project, index) => (
                    <HolographicCard key={project.id} project={project} index={index} />
                ))}
            </div>

        </section>
    );
}
