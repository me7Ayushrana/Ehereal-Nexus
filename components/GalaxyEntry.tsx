"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function GalaxyParticles({ onDive, isDiving }: { onDive: () => void; isDiving: boolean }) {
    const pointsRef = useRef<THREE.Points>(null);

    // Galaxy parameters
    const parameters = {
        count: 2000,
        size: 0.02,
        radius: 5,
        branches: 3,
        spin: 1,
        randomness: 0.2,
        randomnessPower: 3,
        insideColor: "#ffffff",
        outsideColor: "#a855f7",
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
            // Base rotation
            pointsRef.current.rotation.y += delta * 0.1;

            if (isDiving) {
                // WARP DRIVE EFFECT
                // significantly increase rotation speed
                pointsRef.current.rotation.y += delta * 12.0;

                // Pull camera into the center
                // We use lerp for a smooth but fast acceleration
                state.camera.position.lerp(new THREE.Vector3(0, 0, 0), delta * 5.0);

                // Optional: visual distortion could be added here by modifying material uniforms
                // but camera movement is usually sufficient for the "warp" feel.
            }
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
            {/* Hit box for easier clicking */}
            <mesh onClick={onDive} visible={false}>
                <sphereGeometry args={[25, 32, 32]} />
                <meshBasicMaterial side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

export default function GalaxyEntry() {
    const router = useRouter();
    const [isDiving, setIsDiving] = useState(false);

    const handleDive = () => {
        if (isDiving) return; // Prevent double trigger
        setIsDiving(true);

        // Wait for animation to play before navigating
        setTimeout(() => {
            router.push("/projects");
        }, 400); // 400ms match roughly with the camera lerp speed to 0
    };

    useEffect(() => {
        // Prefetch the projects page for instant transition
        router.prefetch("/projects");
    }, [router]);

    return (
        <section id="galaxy" className="relative h-[80vh] w-full bg-void flex flex-col items-center justify-start pt-12 overflow-hidden">
            {/* 3D Canvas Container - Using onClick to handle all interactions on the canvas wrapper */}
            <div
                className="absolute inset-0 z-0 cursor-pointer"
                onClick={handleDive}
            >
                <Canvas camera={{ position: [0, 3, 5], fov: 60 }}>
                    <color attach="background" args={['#000000']} />
                    <GalaxyParticles onDive={handleDive} isDiving={isDiving} />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate={!isDiving} // Stop auto rotation logic when diving, we handle it manually
                        autoRotateSpeed={0.5}
                        enablePan={false}
                        enabled={!isDiving} // Disable controls during dive
                    />
                </Canvas>
            </div>

            <div className="relative z-10 pointer-events-none flex flex-col items-center w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    animate={isDiving ? { opacity: 0, scale: 0, transition: { duration: 0.3 } } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="pointer-events-auto cursor-pointer group"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent bubbling to parent if we handle it here
                        handleDive();
                    }}
                >
                    <div className="glass-panel px-10 py-4 rounded-full border border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] hover:shadow-[0_0_80px_-12px_rgba(168,85,247,0.6)] transition-all duration-300 backdrop-blur-md bg-black/40 group-hover:bg-black/50">
                        <h2 className="text-xl md:text-3xl font-display tracking-widest text-center text-white/90 uppercase">
                            Play with <span className="shimmer-purple mx-2">GALAXY</span>
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
