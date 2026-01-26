"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";

export default function VoidSphere() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
}

function AnimatedSphere() {
    const meshRef = useRef<any>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.25;
    });

    return (
        <Sphere
            ref={meshRef}
            args={[1.5, 64, 64]}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.1 : 1}
        >
            <MeshDistortMaterial
                color="#000000"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.9}
                emissive="#a855f7" // Purple glow
                emissiveIntensity={0.2}
                wireframe={true} // Cyberpunk feel
            />
        </Sphere>
    );
}
