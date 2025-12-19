// import type { Request, Response } from "express";
// import * as TaskService from "../services/task.service";
// import { CreateTaskDto } from "../dto/task.dto";

// export const createTask = async (req: any, res: Response) => {
//   CreateTaskDto.parse(req.body);
//   const task = await TaskService.createTask(req.body, req.user.id);
//   res.status(201).json(task);
// };

// export const getTasks = async (_: Request, res: Response) => {
//   const tasks = await TaskService.getTasks();
//   res.json(tasks);
// };


import type { Request, Response } from "express";
import * as TaskService from "../services/task.service";
import { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto";
import mongoose from "mongoose";

export const createTask = async (req: any, res: Response) => {
  try {
    
    const validatedData = CreateTaskDto.parse(req.body);

    
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const task = await TaskService.createTask(
      validatedData,
      req.user.id
    );

    res.status(201).json(task);
  } catch (error: any) {
    console.error("CREATE TASK ERROR:", error);

    
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await TaskService.getTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const data = UpdateTaskDto.parse(req.body);

    const task = await TaskService.updateTask(
      req.params.id,
      data
    );

    res.json(task);
  } catch (err: any) {
    if (err.message === "TASK_NOT_FOUND") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const deletedTask = await TaskService.deleteTask(id);

    res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
  } catch (err: any) {
    console.error("Delete Task Error:", err);

    if (err.code === "TASK_NOT_FOUND") {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

