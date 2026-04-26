import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Recycle,
  MapPin,
  Sparkles,
  Trophy,
  ArrowRight,
  Brain,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { AnimatedBin } from "../components/cleancity/AnimatedBin";
import { BinMap } from "../components/cleancity/BinMap";
import { MOCK_BINS } from "../data/mockData";

const features = [
  {
    icon: Brain,
    title: "AI Overflow Prediction",
    desc: "ML models forecast bin fill-up hours in advance, before overflow ever happens.",
  },
  {
    icon: MapPin,
    title: "Live IoT Bin Network",
    desc: "Sensor-driven fill levels stream to dispatchers in real-time across the city.",
  },
  {
    icon: Truck,
    title: "Smart Route Optimization",
    desc: "Dynamic routing assigns drivers to high-priority bins, cutting fuel by 38%.",
  },
  {
    icon: Trophy,
    title: "Citizen Rewards",
    desc: "Gamified reporting turns residents into city-wide environmental allies.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen hero-bg">
      
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center shadow-lg">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              CleanCity<span className="gradient-text">.AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-xl">
              <Link to="/login">Sign in</Link>
            </Button>

            <Button asChild size="sm" className="rounded-xl bg-gradient-to-r from-primary to-secondary">
              <Link to="/register">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} 
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Smart Waste Management · Powered by AI</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              The city that
              <br />
              <span className="gradient-text">cleans itself.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              CleanCity.AI connects citizens, drivers, and municipal authorities
              through an intelligent IoT network — predicting overflows,
              optimizing routes, and rewarding eco-action in real time.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="sm" className="rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg glow-primary">
                <Link to="/register">Launch dashboard <ArrowRight className="ml-2 w-5 h-4" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-xl bg-whi">
                <Link to="/app/citizen">Explore demo</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm">
              <div>
                <div className="font-display text-2xl font-bold">12.4k</div>
                <div className="text-muted-foreground text-xs">Smart bins</div>
              </div>

              <div>
                <div className="font-display text-2xl font-bold">38%</div>
                <div className="text-muted-foreground text-xs">Less fuel used</div>
              </div>

              <div>
                <div className="font-display text-2xl font-bold">96%</div>
                <div className="text-muted-foreground text-xs">Resolution rate</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">

              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-secondary/30 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs pr-17 text-muted-foreground uppercase tracking-wider">
                      Live IoT feed
                    </div>
                    <div className="font-display font-bold text-lg">
                      Hazratganj cluster
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Streaming
                  </div>
                </div>

                <div className="flex items-end justify-around gap-2 mb-2">
                  <div className="animate-float">
                    <AnimatedBin fillLevel={92} code="HZ-12" size="lg" />
                  </div>

                  <div className="animate-float" style={{ animationDelay: "0.6s" }}>
                    <AnimatedBin fillLevel={47} code="GM-04" size="lg" />
                  </div>

                  <div className="animate-float" style={{ animationDelay: "1.2s" }}>
                    <AnimatedBin fillLevel={23} code="IN-09" size="lg" />
                  </div>
                </div>

                <div className="mt-6 glass rounded-xl p-3 flex items-center gap-3 text-sm">
                  <Brain className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>HZ-12</strong> will be full in <strong>~1h</strong> · auto-dispatched to driver Suresh
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
   <section className="px-4 md:px-8 pb-20">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold">
        Built for every role in the city
      </h2>
      <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
        From citizens reporting hotspots to admins monitoring city-wide impact — one connected platform.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((f, i) => {
        const Icon = f.icon;

        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center mb-4">
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>

            <h3 className="font-display font-semibold text-lg">
              {f.title}
            </h3>

            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        );
      })}
    </div>

  </div>
</section>
<section className="px-4 md:px-8 pb-24">
  <div className="max-w-7xl mx-auto glass-strong rounded-3xl p-6 md:p-8">

    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="font-display text-2xl font-bold">
          Live city map
        </h2>
        <p className="text-sm text-muted-foreground">
          Real-time bin status across Lucknow
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          Empty
        </span>

        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-warning" />
          Medium
        </span>

        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
          Full
        </span>
      </div>
    </div>

    <BinMap bins={MOCK_BINS} height="460px" />
  </div>
</section>

<footer className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
  Built with 💚 for smarter cities · CleanCity.AI © 2026
</footer>

    </div>
  );
}