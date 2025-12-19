import { Schema, model, Types } from "mongoose";

// const TaskSchema = new Schema(
//   {
//     title: String,
//     description: String,
//     dueDate: Date,
//     priority: String,
//     status: String,
//     creatorId: { type: Types.ObjectId, ref: "User" },
//     assignedToId: { type: Types.ObjectId, ref: "User" },
//   },
//   { timestamps: true }
// );

// export const Task = model("Task", TaskSchema);


const TaskSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String },
    dueDate: { type: Date },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Low",
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Review", "Completed"],
      default: "To Do",
    },

    creatorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedToId: {
      type: String,
      ref: "User",
      required: true,
      default: "testUser",
    },
  },
  { timestamps: true }
);

export const Task = model("Task", TaskSchema);

