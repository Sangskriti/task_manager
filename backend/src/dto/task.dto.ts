// import { z } from "zod";

// export const CreateTaskDto = z.object({
//   title: z.string().min(1, "Title is required").max(100),
//   description: z.string(),
//   dueDate: z.string(),
//   priority: z.enum(["Low", "Medium", "High", "Urgent"]).default("Low"),
//   status: z.enum(["To Do", "In Progress", "Review", "Completed"]),
//   assignedToId: z.string(),
// });


import { z } from "zod";

export const PriorityEnum = z.enum([
  "Low",
  "Medium",
  "High",
  "Urgent",
]);

export const StatusEnum = z.enum([
  "To Do",
  "In Progress",
  "Review",
  "Completed",
]);

export const CreateTaskDto = z.object({
  title: z.string().min(1, "Title is required").max(100),

  description: z.string().optional(),

  dueDate: z.string().optional(),

  priority: z.enum(["Low", "Medium", "High", "Urgent"]).default("Low"),

  status: z
    .enum(["To Do", "In Progress", "Review", "Completed"])
    .default("To Do"),

  assignedToId: z.string().optional(),
});

export const UpdateTaskDto = CreateTaskDto.partial();

export const TaskFilterDto = z.object({
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  sortByDueDate: z.enum(["asc", "desc"]).optional(),
});
