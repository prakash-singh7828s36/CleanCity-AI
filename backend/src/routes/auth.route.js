import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.get("/admin-only", authenticate, authorize("admin"), (req, res) => {
  return res.json({ message: "Admin access granted.", user: req.user });
});
router.get("/driver-only", authenticate, authorize("driver"), (req, res) => {
  return res.json({ message: "Driver access granted.", user: req.user });
});

export default router;
