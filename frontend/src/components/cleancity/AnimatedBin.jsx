import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // 🔥 yaha change kiya

export function AnimatedBin({
  fillLevel,
  code,
  size = "md",
  showLabel = true,
}) {
  const dim =
    size === "sm"
      ? "w-14 h-20"
      : size === "lg"
      ? "w-28 h-40"
      : "w-20 h-28";

  const status =
    fillLevel >= 80 ? "full" : fillLevel >= 50 ? "mid" : "low";

  const fillBg =
    status === "full"
      ? "var(--gradient-bin-full)"
      : status === "mid"
      ? "var(--gradient-bin-mid)"
      : "var(--gradient-bin-low)";

  const glow = status === "full";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", dim)}>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[110%] h-3 rounded-t-md bg-foreground/80 shadow-sm" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-foreground/60" />

        <div
          className={cn(
            "relative w-full h-full overflow-hidden rounded-b-xl rounded-t-md border-2 border-foreground/70 bg-white/40",
            glow && "animate-pulse-glow"
          )}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${fillLevel}%` }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: fillBg }}
            className="absolute bottom-0 left-0 right-0"
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-white/30 blur-sm" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-px bg-foreground/15" />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-sm text-white mix-blend-difference">
              {fillLevel}%
            </span>
          </div>
        </div>
      </div>

      {showLabel && code && (
        <span className="text-xs font-medium text-muted-foreground">
          {code}
        </span>
      )}
    </div>
  );
}