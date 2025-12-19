import TaskCard from "./TaskCard";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  filter: "assigned" | "created" | "overdue";
  statusFilter: string;
  priorityFilter: string;
  sort: "asc" | "desc" | "";
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskList({
  tasks,
  filter,
  statusFilter,
  priorityFilter,
  sort,
  onUpdate,
  onDelete,
}: TaskListProps) {
  const userId = localStorage.getItem("userId") || "testUser"; // fallback for testing

  // Start with all tasks passed from Dashboard
  let filtered = [...tasks];

  // Personal filters
  if (filter === "assigned") filtered = filtered.filter(t => t.assignedToId === userId);
  if (filter === "created") filtered = filtered.filter(t => t.creatorId === userId);
  if (filter === "overdue")
    filtered = filtered.filter(
      t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Completed"
    );

  // Status filter
  if (statusFilter) filtered = filtered.filter(t => t.status === statusFilter);

  // Priority filter
  if (priorityFilter) filtered = filtered.filter(t => t.priority === priorityFilter);

  // Sort by due date
  if (sort) {
    filtered.sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return sort === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    });
  }

  if (filtered.length === 0) return <p>No tasks found</p>;

  return (
    <div className="space-y-3">
      {filtered.map(task => (
        <TaskCard key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
