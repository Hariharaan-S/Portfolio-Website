import express from "express";
import {
  createAchievement,
  createProject,
  createSkill,
  dashboard,
  deleteAchievement,
  deleteProject,
  deleteSkill,
  login,
  loginPage,
  logout,
  updateAchievement,
  updateProject,
  updateSkill,
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/login", loginPage);
router.post("/login", login);
router.post("/logout", requireAdmin, logout);

router.use(requireAdmin);
router.get("/", dashboard);

router.post("/skills", createSkill);
router.post("/skills/:id/update", updateSkill);
router.post("/skills/:id/delete", deleteSkill);

router.post("/projects", createProject);
router.post("/projects/:id/update", updateProject);
router.post("/projects/:id/delete", deleteProject);

router.post("/achievements", createAchievement);
router.post("/achievements/:id/update", updateAchievement);
router.post("/achievements/:id/delete", deleteAchievement);

export default router;
