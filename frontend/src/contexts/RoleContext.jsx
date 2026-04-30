import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState("citizen");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("cleanCityRole");
      if (storedRole) {
        setRole(storedRole);
      }
    }
  }, []);

  const saveRole = (nextRole) => {
    setRole(nextRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("cleanCityRole", nextRole);
    }
  };

  const userName =
    role === "citizen"
      ? "Aanya"
      : role === "nigam"
      ? "Officer Mehta"
      : role === "driver"
      ? "Suresh Yadav"
      : "Admin Verma";

  return (
    <Ctx.Provider value={{ role, setRole: saveRole, userName }}>
      {children}
    </Ctx.Provider>
  );
}

export function useRole() {
  const v = useContext(Ctx);

  if (!v) {
    throw new Error("useRole must be used within RoleProvider");
  }

  return v;
}
