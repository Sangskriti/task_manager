import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { JWT_SECRET } from "../config/jwt";

export const register = async (data: any) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashed });
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  if (!user?.password) {
  throw new Error("User password not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return jwt.sign({ id: user._id }, JWT_SECRET);
};
