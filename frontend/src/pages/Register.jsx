import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Recycle,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Building2,
  Truck,
  Shield,
  Users,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectItem } from "../components/ui/select";
import { useRole } from "../contexts/RoleContext";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const roleIcons = {
  citizen: Users,
  nigam: Building2,
  driver: Truck,
  admin: Shield,
};

const Register = () => {
  const nav = useNavigate();
  const { setRole } = useRole();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selRole, setSelRole] = useState("citizen");
  const [city, setCity] = useState("lucknow");
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
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role: selRole,
          city,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      const { token, user } = data;
      localStorage.setItem("cleanCityToken", token);
      localStorage.setItem("cleanCityUser", JSON.stringify(user));
      localStorage.setItem("cleanCityRole", user.role);
      setRole(user.role);
      nav(routeMap[user.role] || "/app/citizen");
    } catch (err) {
      setError("Unable to register. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-4 py-10">
      {/* logo */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center gap-2">
          <Recycle className="w-5 h-5" />
          <span className="font-bold">CleanCity.AI</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="glass-strong rounded-3xl p-8">
          <h1 className="text-3xl font-bold mb-4">Create account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Select Role</Label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                {Object.keys(roleIcons).map((r) => {
                  const Icon = roleIcons[r];
                  const active = selRole === r;

                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelRole(r)}
                      className={`rounded-xl p-3 border-2 transition-all text-xs font-medium flex flex-col items-center gap-1.5 ${
                        active
                          ? "border-primary bg-primary/10 shadow-md scale-105"
                          : "border-border bg-background/40 hover:border-primary/40"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          active ? "text-primary" : "text-muted-foreground"
                        }`}
                      />

                      <span className="capitalize">
                        {r === "nigam" ? "Nagar Nigam" : r}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@city.gov"
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label>City</Label>
              <Select value={city} onValueChange={(value) => setCity(value)}>
                <SelectItem value="lucknow">Lucknow</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? "Creating account..." : "Create account"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
