import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markDone,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", authenticate, getTasks);
router.post("/tasks", authenticate, createTask);
router.put("/tasks/:id", authenticate, updateTask);
router.delete("/tasks/:id", authenticate, deleteTask);
router.patch("/tasks/:id/done", authenticate, markDone);

export default router;
