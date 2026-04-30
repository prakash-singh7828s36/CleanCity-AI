import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

const app = express(); // for creating the server

console.log("Setting up middleware...");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

console.log("Setting up routes...");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.json({ message: "CleanCity backend is running." });
});

console.log("App setup complete");

export default app;
