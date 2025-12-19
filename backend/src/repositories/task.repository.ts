
// export const TaskRepository = {
//   create: (data: any) => Task.create(data),
//   findAll: () => Task.find().populate("assignedToId", "name"),
// };
import { Task } from "../models/Task.model";
import { Types } from "mongoose";

export const TaskRepository = {
  create: (data: any) => Task.create(data),

  findAll: () => Task.find().populate("assignedToId", "name"),

  findByUser: (userId: string) =>
    Task.find({
      $or: [{ creatorId: userId }, { assignedToId: userId }],
    }).populate("assignedToId", "name"),

  findById: (taskId: string) => Task.findById(taskId),

  updateById: (taskId: string, data: any) =>
    Task.findByIdAndUpdate(taskId, data, { new: true }),

  deleteById: (taskId: string) =>
    Task.findByIdAndDelete(taskId),
};
