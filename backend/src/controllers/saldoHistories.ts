import express from "express";
import {
  createSaldoHistory,
  getSaldoHistoriesWithUserInfo,
} from "../services/saldoHistories";
import { getUserById, updateUserById } from "../services/users";

export const getAllSaldoHistoriesWithUserInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const saldoHistories = await getSaldoHistoriesWithUserInfo();
    res.status(200).json(saldoHistories).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error.", status: 500 });
  }
};

export const updateSaldo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { amount, type } = req.body;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found.", status: 404 });
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount.", status: 400 });
    }

    if (type !== "topup" && type !== "withdraw") {
      return res
        .status(400)
        .json({
          error: "Invalid type. Use 'topup' or 'withdraw'.",
          status: 400,
        });
    }

    if (type === "withdraw" && user.saldo < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient balance.", status: 400 });
    }

    const saldo = type === "topup" ? user.saldo + amount : user.saldo - amount;
    const saldoHistory = await createSaldoHistory({
      userId: id,
      amount,
      saldo,
    });

    await updateUserById(id, {
      saldo,
    });

    res.status(200).json(saldoHistory).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error.", status: 500 });
  }
};
