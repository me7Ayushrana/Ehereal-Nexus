"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export default function StarfieldBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-void">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
            </Canvas>
        </div>
    );
}

function StarField(props: any) {
    const ref = useRef<THREE.Points>(null!);

    // Generate random stars
    const [positions] = useState(() => {
        const positions = new Float32Array(5000 * 3);
        const colors = new Float32Array(5000 * 3);

        for (let i = 0; i < 5000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;   // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;   // z
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Basic rotation
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Check scroll speed (if accessible, otherwise constant drift)
        // For a true warp effect we'd need to bind to window scroll
        const scrollY = window.scrollY; // Crude access, but works for effect
        const speed = 1 + (scrollY * 0.0005); // Speed increases with scroll position

        // Warp effect logic would ideally use shaders or z-movement
        // Here we simulate it by rotating faster based on scroll
        ref.current.rotation.z += delta * (0.05 + (scrollY * 0.0001));
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}
