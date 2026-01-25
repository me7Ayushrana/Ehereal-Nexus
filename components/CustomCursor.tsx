"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleHoverStart = () => setIsHovered(true);
        const handleHoverEnd = () => setIsHovered(false);

        window.addEventListener("mousemove", moveCursor);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, .interactive");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-cyan/50 pointer-events-none z-50 mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                backgroundColor: isHovered ? "rgba(0, 243, 255, 0.1)" : "transparent",
                borderColor: isHovered ? "rgba(0, 243, 255, 0.8)" : "rgba(0, 243, 255, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-neon-cyan rounded-full" />
        </motion.div>
    );
}
