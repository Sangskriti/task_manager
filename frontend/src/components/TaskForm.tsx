import { useForm } from "react-hook-form";
import { createTask } from "../services/task.service";
import { Task } from "../types/task";

type TaskFormData = {
  title: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
};

export default function TaskForm({ onAdd }: { onAdd: (task: Task) => void }) {
  const { register, handleSubmit, reset } = useForm<TaskFormData>({ defaultValues: { priority: "Low" } });

  const onSubmit = async (data: TaskFormData) => {
    try {
      const newTask = await createTask(data); // backend call
      onAdd(newTask); // Dashboard updates state
      reset();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="w-full border rounded-lg p-3 mb-3 text-sm sm:text-base"
      />
      <select {...register("priority")} className="w-full border rounded-lg p-3 mb-4 text-sm sm:text-base">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-sm sm:text-base">
        Add Task
      </button>
    </form>
  );
}
