import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useRole } from "../../contexts/RoleContext";
import { ROLE_LABELS } from "../../data/mockData";
import { useState, useEffect } from "react";

import {
  Recycle,
  LayoutDashboard,
  MapPin,
  Trophy,
  Users,
  BarChart3,
  Truck,
  LogOut,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";

import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

/*  ROLE NAV  */
const ROLE_NAV = {
  citizen: [
    { label: "Dashboard", to: "/app/citizen", scrollId: "citizen-dashboard", icon: LayoutDashboard },
    { label: "Report", to: "/app/citizen/report", scrollId: "citizen-report", icon: MapPin },
    { label: "Leaderboard", to: "/app/citizen/leaderboard", scrollId: "citizen-leaderboard", icon: Trophy },
  ],
  nagarnigam: [
    { label: "Overview", to: "/app/nigam", scrollId: "nigam-overview", icon: LayoutDashboard },
    { label: "Bins", to: "/app/nigam/bins", scrollId: "nigam-bins", icon: MapPin },
    { label: "Drivers", to: "/app/nigam/drivers", scrollId: "nigam-drivers", icon: Truck },
  ],
  driver: [
    { label: "Overview", to: "/app/driver/overview", scrollId: "driver-overview", icon: LayoutDashboard },
    { label: "Route", to: "/app/driver", scrollId: "driver-route", icon: MapPin },
    { label: "Tasks", to: "/app/driver/tasks", scrollId: "driver-tasks", icon: LayoutDashboard },

  ],
  admin: [
    { label: "Overview", to: "/app/admin", scrollId: "admin-overview", icon: BarChart3 },
    { label: "Users", to: "/app/admin/users", scrollId: "admin-users", icon: Users },
    { label: "City", to: "/app/admin/city", scrollId: "admin-city", icon: MapPin },
  ],
};


const scrollToSection = (id) => {
  const element = document.getElementById(id);

  if (!element) {
    console.log("❌ Section not found:", id);
    return;
  }

  const yOffset = -100; // navbar height adjust
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

export function Navbar() {
  const { role, setRole, userName } = useRole();
  const loc = useLocation();

  const items = ROLE_NAV[role] || [];


  const [activeSection, setActiveSection] = useState("citizen-dashboard");

  useEffect(() => {
    const handleScroll = () => {
      for (let it of items) {
        const el = document.getElementById(it.scrollId);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top >= 0 && rect.top <= 150) {
          setActiveSection(it.scrollId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);


  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,95vw)]"
    >
      <div className="glass-strong rounded-3xl px-4 py-3.5 flex items-center gap-3 w-screen ml-140">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 px-2 ">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center shadow-md ">
            <Recycle className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-base hidden sm:inline">
            CleanCity<span className="gradient-text">.AI</span>
          </span>
        </Link>

        {/* NAV ITEMS */}
        <div className="hidden md:flex items-center gap-1 ml-3">
          {items.map((it) => {
            const active = activeSection === it.scrollId;
            const Icon = it.icon;

            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={(event) => {
                  if (it.scrollId) {
                    event.preventDefault();
                    setActiveSection(it.scrollId);
                    scrollToSection(it.scrollId);
                  }
                }}
                className={cn(
                  "relative px-3 py-1.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5",
                  active
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}

                <span className="relative flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {it.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        {/* <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-xl gap-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary grid place-items-center text-xs font-bold text-primary-foreground">
                  {userName?.charAt(0) || "U"}
                </span>

                <span className="hidden sm:inline text-sm font-medium">
                  {userName}
                </span>

                <span className="hidden md:inline text-xs text-muted-foreground">
                  · {ROLE_LABELS[role]}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 glass-strong">
              <DropdownMenuLabel>Switch role (demo)</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {Object.keys(ROLE_LABELS).map((r) => (
                <DropdownMenuItem
                  key={r}
                  onClick={() => setRole(r)}
                  className="cursor-pointer"
                >
                  {ROLE_LABELS[r]} {role === r && "✓"}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/login">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    </motion.nav>
  );
}