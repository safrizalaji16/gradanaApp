import type { NextApiRequest, NextApiResponse } from "next";
import { userService } from "@/services/userService";
import { cookieName } from "@/constants/api/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userCookie = req.cookies[cookieName];
    if (req.method === "GET") {
      const { data } = await userService.getUserLoggedIn(userCookie);
      return res.status(200).json(data);
    }

    return res.status(405).json("Method not allowed");
  } catch (error) {
    console.error("Error in login:", error.error);
    if (error) {
      return res.status(error.status).json({ message: error.error });
    } else {
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
