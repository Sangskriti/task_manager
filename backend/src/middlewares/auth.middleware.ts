// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config/jwt";

// export const auth = (req: any, res: any, next: any) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   req.user = jwt.verify(token, JWT_SECRET);
//   next();
// };


import { JWT_SECRET } from "../config/jwt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    req.user = { id: decoded.id }; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
