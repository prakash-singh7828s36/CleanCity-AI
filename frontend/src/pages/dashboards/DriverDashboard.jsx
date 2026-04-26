import { motion } from "framer-motion";
import { useState } from "react";
import { Navigation, CheckCircle2, MapPin, Truck, Clock } from "lucide-react";

import { AppLayout } from "../../components/cleancity/AppLayout"; 
import { StatCard } from "../../components/cleancity/StatCard";  
import { BinMap } from "../../components/cleancity/BinMap";      
import { Button } from "../../components/ui/button";             

import { DRIVER_ROUTE, MOCK_BINS } from "../../data/mockData";    
import { toast } from "sonner"; 

const DriverDashboard = () => {
  const [tasks, setTasks] = useState(DRIVER_ROUTE);

  const completed = tasks.filter((t) => t.status === "completed").length;

  const markDone = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.binId === id ? { ...t, status: "completed", eta: "Done" } : t
      )
    );
    toast.success("Bin marked as cleaned 🧹");
  };

  const routeBins = MOCK_BINS.filter((b) =>
    tasks.some((t) => t.binId === b.id)
  );

  const orderedIds = tasks.map((t) => t.binId);

  return (
    <AppLayout>
      <div id="driver-overview" className="mb-6 flex flex-wrap items-end justify-between gap-3 text-left">
        <div>
          <div className="text-xs uppercase tracking-wider text-secondary font-semibold">
            Driver Console
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-1">
            Today's route
          </h1>
          <p className="text-muted-foreground mt-1">
            Vehicle UP-32-AB-4521 · Suresh Yadav
          </p>
        </div>

        <Button className="rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg">
          <Navigation className="w-4 h-4 mr-2" /> Start navigation
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Bins assigned" value={tasks.length} icon={MapPin} />

        <StatCard
          label="Completed"
          value={completed}
          delta={`${Math.round((completed / tasks.length) * 100)}%`}
          icon={CheckCircle2}
        />

        <StatCard
          label="ETA next"
          value={tasks.find((t) => t.status === "pending")?.eta ?? "—"}
          icon={Clock}
        />

        <StatCard label="Distance left" value="6.2 km" icon={Truck} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <motion.div id="driver-route" className="lg:col-span-3 glass-strong rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-4">Optimized route</h2>
          <BinMap bins={routeBins} height="460px" routeBinIds={orderedIds} />
        </motion.div>

        <motion.div id="driver-tasks" className="lg:col-span-2 glass-strong rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-4">Task list</h2>

          <ol className="space-y-3">
            {tasks.map((t, i) => (
              <li
                key={t.binId}
                className={`relative pl-9 pr-3 py-3 rounded-xl border ${
                  t.status === "completed"
                    ? "border-primary/40 bg-primary/5"
                    : "border-gray-300 bg-white/40"
                }`}
              >
                <span
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold ${
                    t.status === "completed"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {t.status === "completed" ? "✓" : i + 1}
                </span>

                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">
                      {t.code} · {t.address}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Fill {t.fillLevel}% · ETA {t.eta}
                    </div>
                  </div>

                  {t.status === "pending" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => markDone(t.binId)}
                    >
                      Mark done
                    </Button>
                  ) : (
                    <span className="text-xs text-primary font-semibold">
                      Cleaned
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default DriverDashboard;