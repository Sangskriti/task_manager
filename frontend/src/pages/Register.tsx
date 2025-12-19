import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await api.post("/auth/register", data);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
      <input {...register("name")} placeholder="Name" className="border p-2 w-full mb-2" />
      <input {...register("email")} placeholder="Email" className="border p-2 w-full mb-2" />
      <input type="password" {...register("password")} placeholder="Password" className="border p-2 w-full mb-2" />
      <button className="bg-blue-600 text-white p-2 w-full">Register</button>
    </form>
  );
}
