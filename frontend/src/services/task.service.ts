// import api from "../api/axios";

// export const createTask = (data: any) =>
//   api.post("/api/tasks", data);

// export const getTasks = async () => {
//   const res = await api.get("/api/tasks");
//   return res.data;  
// };
// export const updateTask = (id: string, data: any) =>
//   api.put(`/api/tasks/${id}`, data);

// export const deleteTask = (id: string) =>
//   api.delete(`/api/tasks/${id}`);



import api from "../api/axios";

export const createTask = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/api/tasks",     // ✅ correct route
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ auth
      },
    }
  );

  return res.data; // ✅ ONLY return task object
};

export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateTask = async (id: string, data: any) => {
  const token = localStorage.getItem("token");

  const res = await api.put(`/api/tasks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // ✅ full updated task
};

export const deleteTask = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true; // task deleted successfully
  } catch (err: any) {
    // if (err.response?.status === 404) {
    //   alert("Task not found or already deleted");
    // } else {
    //   alert("Failed to delete task. Please try again.");
    // }
    console.error("Delete Task Frontend Error:", err);
    return false;
  }
};

