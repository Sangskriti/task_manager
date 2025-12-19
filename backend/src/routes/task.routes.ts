import { Router } from "express";
import * as TaskController from "../controllers/task.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", auth, TaskController.createTask);
router.get("/", auth, TaskController.getTasks);
router.put("/:id", auth, TaskController.updateTask);
router.delete("/:id", auth, TaskController.deleteTask);

export default router;
