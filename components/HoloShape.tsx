"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

function AnimatedSphere() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.rotation.x = t * 0.2;
            meshRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={2}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshDistortMaterial
                    color="#00f3ff"
                    attach="material"
                    distort={0.4} // Strength of distortion
                    speed={2} // Speed of distortion
                    roughness={0.2}
                    metalness={1}
                    wireframe={true} // Wireframe for the "Tech" look
                />
            </mesh>
            {/* Inner glowing core */}
            <mesh scale={1.2}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#ff00aa"
                    emissive="#ff00aa"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function HoloShape() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-40">
            <Canvas dpr={[1, 2]}> {/* Limit pixel ratio for performance on high-res screens */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} intensity={1} />
                <AnimatedSphere />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
