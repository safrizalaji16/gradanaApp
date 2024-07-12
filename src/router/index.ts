import express from "express";

import authentication from "./authentication";
import users from "./users";
import saldoHistories from "./saldoHistories";

const router = express.Router();

export default (): express.Router => {
  saldoHistories(router);
  authentication(router);
  users(router);

  return router;
};
