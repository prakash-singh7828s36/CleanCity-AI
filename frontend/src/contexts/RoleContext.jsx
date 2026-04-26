import { createContext, useContext, useState } from "react";

const Ctx = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState("citizen");

  const userName =
    role === "citizen"
      ? "Aanya"
      : role === "nagarnigam"
      ? "Officer Mehta"
      : role === "driver"
      ? "Suresh Yadav"
      : "Admin Verma";

  return (
    <Ctx.Provider value={{ role, setRole, userName }}>
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