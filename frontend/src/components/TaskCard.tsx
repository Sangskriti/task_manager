// export default function TaskCard({ task }: any) {
//   return (
//     <div className="border p-3 rounded mb-2">
//       <h3 className="font-bold">{task.title}</h3>
//       <p>Status: {task.status}</p>
//       <p>Priority: {task.priority}</p>
//     </div>
//   );
// }


import { updateTask, deleteTask } from "../services/task.service";

export default function TaskCard({ task, onUpdate, onDelete }: any) {
  const handleUpdate = async () => {
    const newTitle = prompt("Enter new title", task.title);
    if (!newTitle) return;

     try {
      const updatedTask = await updateTask(task._id, { title: newTitle });
      onUpdate(updatedTask); // <-- update parent state immediately
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(task._id);
    onDelete(task._id);
  };

  return (
    <div className="border p-3 rounded mb-2">
      <h3 className="font-bold">{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <div className="mt-2">
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-2 py-1 mr-2">
          Update
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1">
          Delete
        </button>
      </div>
    </div>
  );
}
