import { motion } from "framer-motion";
import { Users, MapPin, TrendingUp, Recycle, Activity } from "lucide-react";

import { AppLayout } from "../../components/cleancity/AppLayout";
import { StatCard } from "../../components/cleancity/StatCard";
import { BinMap } from "../../components/cleancity/BinMap";

import {
  ANALYTICS_WEEK,
  WASTE_BREAKDOWN,
  MOCK_BINS,
} from "../../data/mockData";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  return (
    <AppLayout>
      <div className="mb-6 text-left">
        <div className="text-xs uppercase tracking-wider text-primary font-semibold">
          Admin · Government
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          City-wide overview
        </h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active citizens" value="42.8k" delta="+5.2% MoM" icon={Users} />
        <StatCard label="Smart bins" value="12,480" delta="+312" icon={MapPin} />
        <StatCard label="Waste diverted" value="1.4k T" delta="+18%" icon={Recycle} />
        <StatCard label="System uptime" value="99.7%" delta="last 30d" icon={Activity} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
       <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="lg:col-span-2 glass-strong rounded-3xl p-6"
>
  <div className="flex items-center justify-between mb-4">
    <h2 className="font-display font-bold text-xl">
      Weekly collection
    </h2>

    <span className="text-xs text-muted-foreground flex items-center gap-1">
      <TrendingUp className="w-3 h-3 text-primary" />
      +14% vs last week
    </span>
  </div>

  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={ANALYTICS_WEEK}
        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(152 76% 45%)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="hsl(152 76% 45%)" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(188 85% 50%)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="hsl(188 85% 50%)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
        />

        <XAxis
          dataKey="day"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />

        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />

        <Tooltip
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
          }}
        />

        <Area
          type="monotone"
          dataKey="collected"
          stroke="hsl(152 76% 45%)"
          fill="url(#g1)"
          strokeWidth={2.5}
        />

        <Area
          type="monotone"
          dataKey="reported"
          stroke="hsl(188 85% 50%)"
          fill="url(#g2)"
          strokeWidth={2.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-strong rounded-3xl p-6"
        >
          <h2 className="font-display font-bold text-xl mb-4">
            Waste breakdown
          </h2>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WASTE_BREAKDOWN}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {WASTE_BREAKDOWN.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="space-y-1.5 mt-2">
            {WASTE_BREAKDOWN.map((d) => (
              <li
                key={d.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: d.color }}
                  />
                  {d.name}
                </span>

                <span className="font-semibold">{d.value}%</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="glass-strong rounded-3xl p-6 mt-6">
        <h2 className="font-bold text-xl mb-4">City bin map</h2>
        <BinMap bins={MOCK_BINS} height="420px" />
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;