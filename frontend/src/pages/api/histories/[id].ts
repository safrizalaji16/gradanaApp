import type { NextApiRequest, NextApiResponse } from "next";
import { cookieName } from "@/constants/api/config";
import { saldoHistoriyService } from "@/services/saldoHistoryService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userCookie = req.cookies[cookieName];
    const { amount, type }: { amount: number; type: string } = req.body;
    const { id } = req.query;

    if (req.method === "POST") {
      const { data } = await saldoHistoriyService.updateSaldo(
        { id: id.toString(), amount, type },
        userCookie
      );
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
