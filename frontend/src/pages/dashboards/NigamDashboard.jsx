import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Truck, CheckCircle2, Send } from "lucide-react";

import { AppLayout } from "../../components/cleancity/AppLayout";
import { StatCard } from "../../components/cleancity/StatCard";
import { BinMap } from "../../components/cleancity/BinMap";
import { AnimatedBin } from "../../components/cleancity/AnimatedBin";
import { Button } from "../../components/ui/button";

import { MOCK_BINS, DRIVERS, MOCK_REPORTS } from "../../data/mockData";
import { toast } from "sonner";

const NigamDashboard = () => {
  const critical = MOCK_BINS.filter((b) => b.fillLevel >= 80);

  return (
    <AppLayout>
      {/* HEADING */}
      <div id="nigam-overview" className="mb-6 text-left">
        <div className="text-xs uppercase tracking-wider text-secondary font-semibold ">
          Nagar Nigam Control
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
          City operations ·{" "}
          <span className="gradient-text">live</span>
        </h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Bins online"
          value="248"
          delta="+12 today"
          icon={MapPin}
          tint="primary"
        />

        <StatCard
          label="Critical (>80%)"
          value={critical.length}
          delta="Auto-dispatching"
          icon={AlertTriangle}
          tint="alert"
        />

        <StatCard
          label="Active drivers"
          value="14"
          delta="2 idle"
          icon={Truck}
          tint="secondary"
        />

        <StatCard
          label="Resolved today"
          value="86"
          delta="+22%"
          icon={CheckCircle2}
          tint="primary"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 glass-strong rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-4 text-left">City bin network</h2>
          <BinMap bins={MOCK_BINS} height="420px" />
        </motion.div>

        <motion.div
          id="nigam-bins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-strong rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl">
              Critical bins
            </h2>
            <span className="text-xs text-alert font-semibold">
              ⚠ Action required
            </span>
          </div>

          <div className="space-y-3">
            {critical.map((b) => (
              <div
                key={b.id}
                className="glass rounded-xl p-3 flex items-center gap-3"
              >
                <AnimatedBin
                  fillLevel={b.fillLevel}
                  size="sm"
                  showLabel={false}
                />

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">
                    {b.code} · {b.address}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Full in ~{b.predictionHours}h
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-3xl text-sm px-3 hover:bg-cyan-100 hover:border-cyan-100 hover:text-cyan-900  "
                  onClick={() =>
                    toast.success(`Dispatched ${b.code} to driver`)
                  }
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Assign
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div id="nigam-drivers" className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="glass-strong rounded-3xl p-6">
          <h2 className="font-display font-bold text-xl mb-4">
            Drivers
          </h2>

          <div className="space-y-2">
            {DRIVERS.map((d) => (
              <div
                key={d.id}
                className="glass rounded-xl p-3 flex items-center gap-3"
              >
                {/* avatar */}
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-secondary to-primary grid place-items-center text-primary-foreground font-bold text-sm">
                  {d.name.charAt(0)}
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {d.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {d.vehicle}
                  </div>
                </div>

                {/* status */}
                <div className="text-xs text-right">
                  <div className="font-semibold">
                    {d.completed}/{d.binsAssigned}
                  </div>

                  <div
                    className={`mt-0.5 inline-block px-2 py-0.5 rounded-full ${d.status === "active"
                      ? "bg-primary/15 text-primary"
                      : d.status === "idle"
                        ? "bg-warning/20 text-warning-foreground"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {d.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-6 text-left">
          <h2 className="font-display font-bold text-xl mb-4 ">
            Citizen reports
          </h2>

          <div className="space-y-3">
            {MOCK_REPORTS.map((r) => (
              <div key={r.id} className="glass rounded-xl p-3">

                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-sm">
                    {r.location} ·{" "}
                    <span className="text-muted-foreground">{r.id}</span>
                  </div>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.status === "resolved"
                      ? "bg-primary/15 text-primary"
                      : r.status === "in_progress"
                        ? "bg-warning/20 text-warning-foreground"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {r.status.replace("_", " ")}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-1">
                  {r.description} — {r.user} · {r.date}
                </p>

              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NigamDashboard;