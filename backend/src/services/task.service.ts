import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto";

// export const createTask = async (data: any, userId: string) => {
//   if (!data.title) throw new Error("Title required");

//   return TaskRepository.create({
//     ...data,
//     creatorId: userId,
//   });
// };

// export const getTasks = async () => {
//   return TaskRepository.findAll();
// };


// let tasks: any[] = [];

// export const createTask = async (data: any, userId: string) => {
//   const task = {
//     id: Date.now(),
//     title: data.title,
//     priority: data.priority,
//     userId,
//     completed: false,
//   };

//   tasks.push(task);
//   return task;
// };

// export const getTasks = async (userId: string) => {
//   return tasks.filter(t => t.userId === userId);
// };



import { z } from "zod";

type CreateTaskInput = z.infer<typeof CreateTaskDto>;
type UpdateTaskInput = z.infer<typeof UpdateTaskDto>;

export const createTask = async (
  data: CreateTaskInput,
  creatorId: string
) => {
  return TaskRepository.create({
    ...data,
    creatorId,
  });
};

export const getTasks = async (userId: string) => {
  return TaskRepository.findByUser(userId);
};

export const updateTask = async (
  taskId: string,
  data: UpdateTaskInput
) => {
  const task = await TaskRepository.findById(taskId);
  if (!task) throw new Error("TASK_NOT_FOUND");

  return TaskRepository.updateById(taskId, data);
};

export const deleteTask = async (taskId: string) => {
  const task = await TaskRepository.findById(taskId);

  if (!task) {
    const error: any = new Error("Task not found");
    error.code = "TASK_NOT_FOUND";
    throw error;
  }

  await TaskRepository.deleteById(taskId);
  return task;
};

