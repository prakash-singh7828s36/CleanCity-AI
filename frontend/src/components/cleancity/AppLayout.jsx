import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useRole } from "../../contexts/RoleContext";

export function AppLayout({ children, requireRole }) {
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireRole && role !== requireRole) {
      const map = {
        citizen: "/app/citizen",
        nigam: "/app/nigam",
        driver: "/app/driver",
        admin: "/app/admin",
      };

      navigate(map[role]);
    }
  }, [role, requireRole, navigate]);

  return (
    <div className="min-h-screen hero-bg">
      <Navbar />

      <main className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}