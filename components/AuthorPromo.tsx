"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function AuthorPromo() {
    return (
        <section id="contact" className="w-full py-16 flex justify-center items-center bg-black/50 backdrop-blur-sm border-t border-white/5">
            <div className="flex flex-col items-center space-y-4">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-xs tracking-[0.3em] text-white/40 uppercase font-light"
                >
                    Architect of the Void
                </motion.p>

                <motion.a
                    href="https://ayushhh-folio.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="group relative flex items-center gap-3 px-6 py-2"
                >
                    <span className="text-2xl font-display font-light text-white group-hover:text-purple-300 transition-colors">
                        Ayush Rana
                    </span>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />

                    {/* Subtle underline effect */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.a>
            </div>
        </section>
    );
}
