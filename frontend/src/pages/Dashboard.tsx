import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../services/task.service";
import { Task } from "../types/task";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState<"" | "asc" | "desc">("");

  const userId = localStorage.getItem("userId") || "testUser";

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      // Ensure every task has required fields
      const prepared = data.map((t: any) => ({
        _id: t._id || String(Date.now()),
        title: t.title,
        priority: t.priority,
        status: t.status || "To Do",
        creatorId: t.creatorId || userId,
        assignedToId: t.assignedToId || userId,
        dueDate: t.dueDate || null,
      }));
      setTasks(prepared);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 const handleAdd = async (task: Task) => {
  try {
    const userId = localStorage.getItem("userId") || "testUser";

    // Make sure assignedToId is valid
    const assignedTo = task.assignedToId && task.assignedToId.trim() !== "" 
      ? task.assignedToId 
      : userId;

    const newTask = await createTask({
      ...task,
      creatorId: task.creatorId || userId,
      assignedToId: assignedTo, // <-- guaranteed to exist
      status: task.status || "To Do",
    });

    // Update frontend state
    setTasks(prev => [newTask, ...prev]);
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || "Task creation failed");
  }
};


 const handleUpdate = async (updatedTask: Task) => {
  try {
    // Call backend API
    const savedTask = await updateTask(updatedTask._id, updatedTask);

    // Update frontend state
    setTasks(prev =>
      prev.map(t => (t._id === savedTask._id ? savedTask : t))
    );
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || "Task update failed");
  }
};

  const handleDelete = async (taskId: string) => {
  try {
    await deleteTask(taskId);
    setTasks(prev => prev.filter(t => t._id !== taskId));
    alert("Task deleted successfully!");
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || "Task deletion failed");
  }
};

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <TaskForm onAdd={handleAdd} />

      <TaskFilters
        status={status}
        priority={priority}
        sort={sort}
        setStatus={setStatus}
        setPriority={setPriority}
        setSort={setSort}
      />

      <h3 className="mt-6 font-semibold">My Assigned Tasks</h3>
      <TaskList
        tasks={tasks}
        filter="assigned"
        statusFilter={status}
        priorityFilter={priority}
        sort={sort}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <h3 className="mt-6 font-semibold">My Created Tasks</h3>
      <TaskList
        tasks={tasks}
        filter="created"
        statusFilter={status}
        priorityFilter={priority}
        sort={sort}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <h3 className="mt-6 font-semibold">Overdue Tasks</h3>
      <TaskList
        tasks={tasks}
        filter="overdue"
        statusFilter={status}
        priorityFilter={priority}
        sort={sort}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
