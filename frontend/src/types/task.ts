export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "To Do" | "In Progress" | "Review" | "Completed";
  creatorId?: string;
  assignedToId?: string;
}
