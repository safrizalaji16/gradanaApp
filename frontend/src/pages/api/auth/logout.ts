import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

import { cookieName } from "@/constants/api/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).json("Method not allowed");
  const currentCookie = req.cookies[cookieName];

  if (!currentCookie) return res.status(400).json("You already logged out");

  const cookie = serialize(cookieName, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
  });

  res.setHeader("Set-Cookie", cookie);

  return res.status(204).json({ message: "Logout success" });
}
