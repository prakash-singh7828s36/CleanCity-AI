import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

const tints = {
  primary: "from-primary/20 to-primary/5 text-primary",
  secondary: "from-secondary/20 to-secondary/5 text-secondary",
  warning: "from-warning/20 to-warning/5 text-warning",
  alert: "from-alert/20 to-alert/5 text-alert",
};

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tint = "primary",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-5 relative overflow-hidden"
    >
      {/* background glow */}
      <div
        className={cn(
          "absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br blur-2xl opacity-50",
          tints[tint]
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {label}
          </p>

          <p className="font-display text-3xl font-bold mt-1">
            {value}
          </p>

          {delta && (
            <p className="text-xs mt-1 flex items-center gap-1 text-primary">
              <TrendingUp className="w-3 h-3" />
              {delta}
            </p>
          )}
        </div>

        <div
          className={cn(
            "w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br",
            tints[tint]
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}