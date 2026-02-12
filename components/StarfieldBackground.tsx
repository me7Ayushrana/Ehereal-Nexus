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
        const count = 2500; // Reduced from 5000 for better performance
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;   // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;   // z
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Basic rotation - Constant smooth drift
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
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
