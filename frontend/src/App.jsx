import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CitizenDashboard from "./pages/dashboards/CitizenDashboard.jsx";
import NigamDashboard from "./pages/dashboards/NigamDashboard.jsx";
import DriverDashboard from "./pages/dashboards/DriverDashboard.jsx";
import AdminDashboard from "./pages/dashboards/AdminDashboard.jsx";

import { RoleProvider } from "./contexts/RoleContext.jsx";
import { LoadingScreen } from "./components/cleancity/LoadingScreen";

const queryClient = new QueryClient();

function RouteLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return <LoadingScreen show={loading} />;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <RoleProvider>
            <RouteLoader />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/app/citizen" element={<CitizenDashboard />} />
              <Route path="/app/citizen/report" element={<CitizenDashboard />} />
              <Route path="/app/citizen/leaderboard" element={<CitizenDashboard />} />

              <Route path="/app/nigam" element={<NigamDashboard />} />
              <Route path="/app/nigam/bins" element={<NigamDashboard />} />
              <Route path="/app/nigam/drivers" element={<NigamDashboard />} />

              <Route path="/app/driver" element={<DriverDashboard />} />
              <Route path="/app/driver/tasks" element={<DriverDashboard />} />

              <Route path="/app/admin" element={<AdminDashboard />} />
              <Route path="/app/admin/users" element={<AdminDashboard />} />
              <Route path="/app/admin/city" element={<AdminDashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>

          </RoleProvider>
        </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;