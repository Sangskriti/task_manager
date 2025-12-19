import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { connectSocket } from "./socket";
import { useEffect } from "react";


export default function App() {
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user?.id) {
    connectSocket(user.id);
  }
}, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
