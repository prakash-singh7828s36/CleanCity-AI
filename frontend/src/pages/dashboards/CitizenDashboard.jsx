import { motion } from "framer-motion";
import { Trophy, MapPin, Award, Sparkles, Camera, CheckCircle2, Crown, Medal } from "lucide-react";
import { useState } from "react";

import { AppLayout } from "../../components/cleancity/AppLayout";
import { StatCard } from "../../components/cleancity/StatCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {WasteClassifier}from "../../components/cleancity/WasteClassifier";

import { LEADERBOARD, MOCK_REPORTS } from "../../data/mockData";
import { toast } from "sonner";

export default function CitizenDashboard() {
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);

      toast.success("Report submitted! +25 eco-points earned 🌱");

      setTimeout(() => {
        setSuccess(false);
        setPreview(null);
        setLocation("");
        setDesc("");
      }, 2200);
    }, 1100);
  };

  return (
    <AppLayout>

      {/* HERO */}
      <div id="citizen-dashboard" className="glass-strong rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

        <div className="relative flex flex-wrap items-center justify-between gap-4 text-left">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-semibold">
              Citizen Dashboard
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
              Hi Aanya 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Your reports keep Lucknow cleaner.
            </p>
          </div>

          <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warning to-destructive grid place-items-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Eco Points</div>
              <div className="font-display font-bold text-2xl">1,320</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Reports filed"
          value="21"
          delta="+3 this week"
          icon={MapPin}
          tint="primary"
        />

        <StatCard
          label="Resolved"
          value="18"
          delta="86% rate"
          icon={CheckCircle2}
          tint="secondary"
        />

        <StatCard
          label="City rank"
          value="#7"
          delta="Top 1%"
          icon={Trophy}
          tint="warning"
        />
      </div>

      {/* FORM */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* report form */}
        <motion.div
          id="citizen-report"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 glass-strong rounded-3xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-xl">
              Report garbage
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* upload */}
            <label className="block">
              <div className="rounded-2xl border-2 border-dashed border-border bg-background/40 p-6 text-center cursor-pointer hover:border-primary transition-colors">

                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full max-h-56 object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <Camera className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm mt-2 font-medium">
                      Click to upload a photo
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      AI will detect waste type
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFile}
                />
              </div>
            </label>

            {/* AI result */}
            {preview && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-3 flex items-center gap-3 text-sm"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span>
                  AI detected: <strong>62% Plastic</strong> ·{" "}
                  <strong>28% Organic</strong> · 10% Mixed
                </span>
              </motion.div>
            )}

            {/* inputs */}
            <Input
              placeholder="📍 Location (auto-detected or type manually)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl h-11 bg-background/50"
              required
            />

            <Textarea
              placeholder="Describe what you saw…"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="rounded-xl bg-background/50 min-h-[90px]"
              required
            />

            {/* submit */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg"
            >
              {success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submitted!
                </>
              ) : submitting ? (
                "Submitting…"
              ) : (
                "Submit report (+25 pts)"
              )}
            </Button>

          </form>
        </motion.div>
        <motion.div
          id="citizen-leaderboard"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-strong rounded-3xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-warning" />
            <h2 className="font-display font-bold text-xl">Leaderboard</h2>
          </div>

          <ul className="space-y-2">
            {LEADERBOARD.map((u) => {
              const isYou = u.name === "You";

              return (
                <li
                  key={u.rank}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${isYou
                    ? "bg-primary/15 border border-primary/40"
                    : "hover:bg-muted/50"
                    }`}
                >
                  {/* rank badge */}
                  <div
                    className={`w-8 h-8 rounded-3xl grid place-items-center font-display font-bold text-sm ${u.rank === 1
                      ? "bg-yellow-300 text-orange-400"
                      : u.rank === 2
                        ? "bg-gradient-to-br from-muted-foreground/40 to-muted text-foreground"
                        : u.rank === 3
                          ? "bg-red-400 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {u.rank === 1 ? (
                      <Crown className="w-4 h-4" />
                    ) : u.rank <= 3 ? (
                      <Medal className="w-4 h-4" />
                    ) : (
                      u.rank
                    )}
                  </div>

                  {/* user info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{u.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {u.reports} reports
                    </div>
                  </div>

                  {/* points */}
                  <div className="font-display font-bold text-sm">
                    {u.points}
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>

      </div>

      <div className="glass-strong rounded-3xl p-6 mt-6">
        <h2 className="font-display font-bold text-xl mb-4">
          Your recent reports
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {MOCK_REPORTS.map((r) => (
            <div
              key={r.id}
              className="glass rounded-xl p-4 flex items-start gap-3"
            >
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">

                  <div className="font-medium text-sm">
                    {r.location}
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
                  {r.description}
                </p>

                <div className="text-xs text-muted-foreground mt-1.5">
                  {r.date} · +{r.points} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WasteClassifier/>

    </AppLayout>
  );
}