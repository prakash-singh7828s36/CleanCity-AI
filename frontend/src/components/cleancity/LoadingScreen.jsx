import { motion, AnimatePresence } from "framer-motion";
import { Recycle, Sparkles } from "lucide-react";

export function LoadingScreen({ show, label = "Loading CleanCity.AI" }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] hero-bg grid place-items-center"
        >
          {/* glow blobs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/30 blur-3xl animate-pulse" />

          <div className="relative flex flex-col items-center gap-6">
            {/* spinner */}
            <div className="relative w-28 h-28">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/40 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-2 rounded-full border-2 border-secondary/30 border-b-secondary"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-5 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center shadow-lg"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <Recycle className="w-8 h-8 text-primary-foreground" />
              </motion.div>
            </div>

            {/* text */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs mb-3">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">
                  Booting smart grid
                </span>
              </div>

              <h2 className="text-2xl font-bold">
                CleanCity<span className="gradient-text">.AI</span>
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                {label}
              </p>
            </div>

            {/* progress */}
            <div className="w-56 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: "60%" }}
              />
            </div>

            {/* dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}