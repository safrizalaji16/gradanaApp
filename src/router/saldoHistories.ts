import express from "express";

import {
  getAllSaldoHistoriesWithUserInfo,
  updateSaldo,
} from "../controllers/saldoHistories";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router
    .get("/histories", isAuthenticated, getAllSaldoHistoriesWithUserInfo)
    .post("/histories/:id", isAuthenticated, isOwner, updateSaldo);
};
