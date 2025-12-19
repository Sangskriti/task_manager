import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const res = await api.post("/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
      <input {...register("email")} placeholder="Email" className="border p-2 w-full mb-2" />
      <input type="password" {...register("password")} placeholder="Password" className="border p-2 w-full mb-2" />
      <button className="bg-green-600 text-white p-2 w-full">Login</button>
    </form>
  );
}
