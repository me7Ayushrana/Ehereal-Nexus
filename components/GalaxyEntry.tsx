"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function GalaxyParticles({ onDive }: { onDive: () => void }) {
    const pointsRef = useRef<THREE.Points>(null);

    // Galaxy parameters
    const parameters = {
        count: 10000,
        size: 0.02,
        radius: 5,
        branches: 3,
        spin: 1,
        randomness: 0.2,
        randomnessPower: 3,
        insideColor: "#00ffff", // Neon Cyan
        outsideColor: "#ff00ff", // Magenta/Purple
    };

    const particles = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            // Position
            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Color
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        return geometry;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group onClick={onDive}>
            <points ref={pointsRef}>
                <bufferGeometry attach="geometry" {...particles} />
                <pointsMaterial
                    attach="material"
                    size={parameters.size}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    vertexColors={true}
                />
            </points>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.5}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="middle"
                    // Default font used to avoid missing file issues
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    DIVE INTO ARCHIVES
                </Text>
            </Float>
        </group>
    );
}

export default function GalaxyEntry() {
    const router = useRouter();

    const handleDive = () => {
        router.push("/projects");
    };

    return (
        <section className="relative h-[80vh] w-full bg-void flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 3, 5], fov: 60 }}>
                    <color attach="background" args={['#000000']} />
                    <GalaxyParticles onDive={handleDive} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div className="px-6 relative z-10 pointer-events-none text-center mt-[40vh]">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-neon-cyan font-mono text-sm tracking-[0.3em] uppercase bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-neon-cyan/30"
                >
                    // Access Neural Database
                </motion.p>
            </div>
        </section>
    );
}
