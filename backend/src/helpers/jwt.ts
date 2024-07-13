import jwt from "jsonwebtoken";

export const generateToken = (payload: Record<string, any>) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET) as Record<string, any>;
