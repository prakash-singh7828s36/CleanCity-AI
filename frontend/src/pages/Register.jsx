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

const roleIcons = {
  citizen: Users,
  nagarnigam: Building2,
  driver: Truck,
  admin: Shield,
};

const Register = () => {
  const nav = useNavigate();
  const { setRole } = useRole();

  const [selRole, setSelRole] = useState("citizen");

  const handleSubmit = (e) => {
    e.preventDefault();

    setRole(selRole);

    const map = {
      citizen: "/app/citizen",
      nagarnigam: "/app/nigam",
      driver: "/app/driver",
      admin: "/app/admin",
    };

    nav(map[selRole]);
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
            
            {/* 🔥 ROLE SELECTION (FIXED + ADVANCED) */}
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
                          active
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />

                      <span className="capitalize">
                        {r === "nagarnigam"
                          ? "Nagar Nigam"
                          : r}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* inputs */}
            <div>
              <Label>Name</Label>
              <Input placeholder="Your name" required />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="you@city.gov" required />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" required />
            </div>

            {/* select */}
            <div>
              <Label>City</Label>
              <Select defaultValue="lucknow">
                <SelectItem value="lucknow">Lucknow</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
              </Select>
            </div>

            {/* button */}
            <Button type="submit" className="w-full mt-2">
              Create account <ArrowRight className="ml-2 w-4 h-4" />
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