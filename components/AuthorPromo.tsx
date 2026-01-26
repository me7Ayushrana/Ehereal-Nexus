"use client";

import { motion } from "framer-motion";
import { ExternalLink, Phone, Instagram, Mail } from "lucide-react";

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

                {/* Connect Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-12 flex flex-col items-center gap-6"
                >
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="glass-panel px-8 py-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col md:flex-row gap-6 md:gap-12 items-center">
                        {/* WhatsApp */}
                        <a href="https://wa.me/917033885133" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/item">
                            <div className="p-2 rounded-full bg-white/5 group-hover/item:bg-white/10 transition-colors">
                                <Phone className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="text-sm font-light text-white/70 group-hover/item:text-white transition-colors">
                                +91 70338 85133
                            </span>
                        </a>

                        {/* Instagram */}
                        <a href="https://instagram.com/ayushrana.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/item">
                            <div className="p-2 rounded-full bg-white/5 group-hover/item:bg-white/10 transition-colors">
                                <Instagram className="w-4 h-4 text-pink-400" />
                            </div>
                            <span className="text-sm font-light text-white/70 group-hover/item:text-white transition-colors">
                                @ayushrana.me
                            </span>
                        </a>

                        {/* Mail */}
                        <a href="mailto:ayushamit007@gmail.com" className="flex items-center gap-3 group/item">
                            <div className="p-2 rounded-full bg-white/5 group-hover/item:bg-white/10 transition-colors">
                                <Mail className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-sm font-light text-white/70 group-hover/item:text-white transition-colors">
                                ayushamit007@gmail.com
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
