import { useEffect, useState } from "react";
import { socket } from "../socket";

interface Task {
  _id: string;
  title: string;
  assignedToId?: string;
  creatorId?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
}

interface NotificationItem {
  message: string;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const handleTaskAssigned = (task: Task) => {
      setNotifications((prev) => [
        ...prev,
        { message: `New task assigned: ${task.title}` },
      ]);
    };

    socket.on("task-assigned", handleTaskAssigned);

    return () => {
      socket.off("task-assigned", handleTaskAssigned);
    };
  }, []);

  return (
    <div className="space-y-2">
      {notifications.map((n, i) => (
        <div key={i} className="notification p-2 bg-blue-100 rounded">
          {n.message}
        </div>
      ))}
    </div>
  );
}
