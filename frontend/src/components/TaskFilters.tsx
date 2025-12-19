
interface TaskFiltersProps {
  
  status: string;
  priority: string;
  sort: "" | "asc" | "desc";
  setStatus: (v: string) => void;
  setPriority: (v: string) => void;
  setSort: React.Dispatch<React.SetStateAction<"" | "asc" | "desc">>;
}

export default function TaskFilters({
  status,
  priority,
  sort,
  setStatus,
  setPriority,
  setSort,
}: TaskFiltersProps) {
  return (
    <div className="flex gap-4 mb-4">
      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Review">Review</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as "" | "asc" | "desc")}
      >
        <option value="">Sort by Due Date</option>
        <option value="asc">Due Date ↑</option>
        <option value="desc">Due Date ↓</option>
      </select>
    </div>
  );
}
