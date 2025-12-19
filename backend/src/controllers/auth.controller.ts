import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dto/auth.dto";

export const register = async (req: Request, res: Response) => {
  RegisterDto.parse(req.body);
  const user = await AuthService.register(req.body);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  LoginDto.parse(req.body);
  const token = await AuthService.login(
    req.body.email,
    req.body.password
  );
  res.json({ token });
};
