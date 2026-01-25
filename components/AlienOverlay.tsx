"use client";

export default function AlienOverlay() {
    return (
        <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden h-full w-full">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[10] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient-vignette opacity-60 z-[20]" />

            {/* Noise/Grain */}
            <div className="absolute inset-0 opacity-[0.03] z-[15] mix-blend-overlay animate-noise"
                style={{ backgroundImage: "url('/noise.svg')" }}
            />
        </div>
    );
}
