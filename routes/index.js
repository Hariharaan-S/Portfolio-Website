import express from "express";
import { homePage, servicePage, projectPage } from "../controllers/pageController.js";
import { sendMessage } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", homePage);
router.get("/send", sendMessage);
router.get("/services/:name", servicePage);
router.get("/projects/:name", projectPage);

export default router;
