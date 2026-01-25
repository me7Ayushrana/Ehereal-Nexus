import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
}

export default function GlassCard({
    children,
    className,
    intensity = "medium",
    ...props
}: GlassCardProps) {
    const intensityMap = {
        low: "bg-white/[0.02] backdrop-blur-sm border-white/5",
        medium: "bg-white/[0.05] backdrop-blur-md border-white/10",
        high: "bg-white/[0.08] backdrop-blur-lg border-white/20",
    };

    return (
        <div
            className={cn(
                "rounded-2xl border transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_-5px_var(--color-neon-cyan)]",
                intensityMap[intensity],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
