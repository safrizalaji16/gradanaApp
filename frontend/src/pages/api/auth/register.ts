import type { NextApiRequest, NextApiResponse } from "next";
import { authService } from "@/services/authService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    username,
    email,
    phoneNumber,
    password,
  }: {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
  } = req.body;

  try {
    if (req.method === "POST") {
      const { data } = await authService.register({
        username,
        email,
        phoneNumber,
        password,
      });

      return res.status(200).json(data);
    }

    return res.status(405).json("Method not allowed");
  } catch (error) {
    console.error("Error in Register:", error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
