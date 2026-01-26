"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Instagram, Mail } from "lucide-react";
import { useEffect } from "react";

interface ConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        {/* Glass Modal */}
                        <div className="pointer-events-auto relative w-full max-w-2xl bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_0_100px_-20px_rgba(168,85,247,0.3)] overflow-hidden">

                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all hover:rotate-90 duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="relative z-10 text-center space-y-10">
                                <div className="space-y-2">
                                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-purple-500">Connect</span>
                                    </h2>
                                    <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
                                        Have a project in mind or just want to say hi? <br />
                                        Reach out through any of these platforms.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <ContactCard
                                        href="https://wa.me/917033885133"
                                        icon={<Phone className="w-6 h-6 text-green-400" />}
                                        label="WhatsApp"
                                        value="+91 70338 85133"
                                        delay={0.1}
                                    />
                                    <ContactCard
                                        href="https://instagram.com/ayushrana.me"
                                        icon={<Instagram className="w-6 h-6 text-pink-400" />}
                                        label="Instagram"
                                        value="@ayushrana.me"
                                        delay={0.2}
                                    />
                                    <ContactCard
                                        href="mailto:ayushamit007@gmail.com"
                                        icon={<Mail className="w-6 h-6 text-blue-400" />}
                                        label="Email"
                                        value="ayushamit007@gmail.com"
                                        delay={0.3}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function ContactCard({ href, icon, label, value, delay }: { href: string; icon: React.ReactNode; label: string; value: string; delay: number }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + delay }}
            className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
        >
            <div className="mb-4 p-3 rounded-full bg-black/20 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">{label}</span>
            <span className="text-sm font-medium text-white group-hover:text-neon-cyan transition-colors">{value}</span>
        </motion.a>
    );
}
