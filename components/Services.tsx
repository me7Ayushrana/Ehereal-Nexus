"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import TiltCard from "./TiltCard";
import {
    Bot,
    Cpu,
    Database,
    FileText,
    Globe,
    Layers
} from "lucide-react";

const services = [
    {
        title: "Hardware & IoT",
        description: "End-to-end prototyping using Arduino, ESP32, and Raspberry Pi sensors.",
        icon: <Cpu className="w-8 h-8 text-neon-cyan" />,
    },
    {
        title: "AI & Machine Learning",
        description: "Custom models for predictive analysis, NLP, and computer vision.",
        icon: <Bot className="w-8 h-8 text-hologram-pink" />,
    },
    {
        title: "Research & Academics",
        description: "Guidance on IEEE papers, project reports, and technical documentation.",
        icon: <FileText className="w-8 h-8 text-purple-400" />,
    },
    {
        title: "Full Stack Development",
        description: "Scalable web & mobile apps using Next.js, React, and Node.js.",
        icon: <Globe className="w-8 h-8 text-blue-400" />,
    },
    {
        title: "AutoCAD & Design",
        description: "Precise 2D/3D modeling for mechanical and civil engineering projects.",
        icon: <Layers className="w-8 h-8 text-orange-400" />,
    },
    {
        title: "Database & Backend",
        description: "Robust architectures using SQL, MongoDB, and Cloud infrastructure.",
        icon: <Database className="w-8 h-8 text-green-400" />,
    },
];

export default function Services() {
    return (
        <section id="services" className="relative py-24 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <span className="text-neon-cyan text-sm tracking-[0.2em] uppercase mb-4 block">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    BUILDING THE FUTURE
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <TiltCard className="h-full">
                            <GlassCard className="p-8 h-full flex flex-col items-center text-center hover:bg-white/[0.08] group">
                                <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-neon-cyan/50 transition-colors shadow-[0_0_15px_-5px_transparent] group-hover:shadow-[0_0_20px_-5px_var(--color-neon-cyan)] relative z-10">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors relative z-10">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm relative z-10">
                                    {service.description}
                                </p>
                            </GlassCard>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
