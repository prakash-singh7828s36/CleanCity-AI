import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Recycle, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRole } from "../contexts/RoleContext";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const Login = () => {
  const nav = useNavigate();
  const { setRole } = useRole();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const routeMap = {
    citizen: "/app/citizen",
    nigam: "/app/nigam",
    driver: "/app/driver",
    admin: "/app/admin",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      const { token, user } = data;
      localStorage.setItem("cleanCityToken", token);
      localStorage.setItem("cleanCityUser", JSON.stringify(user));
      localStorage.setItem("cleanCityRole", user.role);
      setRole(user.role);
      nav(routeMap[user.role] || "/app/citizen");
    } catch (err) {
      setError("Unable to login. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-4 py-10">
      {/* logo */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center">
            <Recycle className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold">
            CleanCity<span className="gradient-text">.AI</span>
          </span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-secondary/30 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-xs mb-4">
              <Sparkles className="w-3 h-3 text-primary" /> Welcome back
            </div>

            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Continue cleaning your city.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@city.gov"
                    className="pl-9 rounded-xl h-11 bg-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pw">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="pw"
                    type="password"
                    required
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 rounded-xl h-11 bg-white/50"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg"
              >
                {isLoading ? "Signing in..." : "Sign in"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground mt-6">
              New to CleanCity?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
