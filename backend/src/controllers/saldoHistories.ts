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
    res.status(400).send(error);
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
      return res.sendStatus(404);
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
    res.status(400).send(error);
  }
};
