import { Router } from "express";
import {
  createTool,
  getAllTools,
  getToolById,
  updateTool,
  deleteTool,
} from "../controllers/tool.controller.js";

const toolRoutes = Router();

toolRoutes.post("/", createTool);
toolRoutes.get("/", getAllTools);
toolRoutes.get("/:id", getToolById);
toolRoutes.put("/:id", updateTool);
toolRoutes.delete("/:id", deleteTool);

export default toolRoutes;
