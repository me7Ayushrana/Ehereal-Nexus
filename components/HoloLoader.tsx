export default function HoloLoader() {
    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-64 h-64 border border-neon-cyan/20 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-32 h-32 border border-neon-cyan/40 rounded-full animate-ping" />
            </div>
        </div>
    );
}
