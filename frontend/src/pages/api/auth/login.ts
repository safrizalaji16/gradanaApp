import type { NextApiRequest, NextApiResponse } from "next";
import { authService } from "@/services/authService";
import { serialize } from "cookie";
import { cookieName } from "@/constants/api/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    if (req.method === "POST") {
      const { data } = await authService.login({ email, password });

      const now = new Date();
      const oneDayInMillis = 24 * 60 * 60 * 1000;
      const expiryTimestamp = now.getTime() + oneDayInMillis;

      now.setTime(expiryTimestamp);

      const cookie = serialize(cookieName, data.authentication.sessionToken, {
        domain: "localhost",
        path: "/",
      });

      res.setHeader("Set-Cookie", cookie);

      return res.status(200).json(data);
    }

    return res.status(405).json("Method not allowed");
  } catch (error) {
    console.error("Error in login:", error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
