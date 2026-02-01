import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "panel";
}

export default function GlassCard({
    children,
    className,
    variant = "default",
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl transition-all duration-300 relative overflow-hidden group",
                variant === "default" ? "glass-card hover:scale-[1.02]" : "glass-panel",
                className
            )}
            {...props}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
