import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useTasks = () =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
