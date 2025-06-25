import { Router } from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";

const skillRoutes = Router();

skillRoutes.post("/", createSkill);
skillRoutes.get("/", getAllSkills);
skillRoutes.get("/:id", getSkillById);
skillRoutes.put("/:id", updateSkill);
skillRoutes.delete("/:id", deleteSkill);

export default skillRoutes;
