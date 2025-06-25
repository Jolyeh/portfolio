import { Router } from "express";
import {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
} from "../controllers/message.controller.js";

const messageRoutes = Router();

messageRoutes.post("/", createMessage);
messageRoutes.get("/", getAllMessages);
messageRoutes.get("/:id", getMessageById);
messageRoutes.delete("/:id", deleteMessage);

export default messageRoutes;
