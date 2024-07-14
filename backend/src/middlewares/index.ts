import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../services/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken).select(
      "+authentication.sessionToken"
    );

    if (!user) {
      return res.sendStatus(403);
    }

    merge(req, { identity: user });

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(401);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = get(req, "identity._id") as string;

    if (!userId || userId.toString() !== id) {
      return res.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(401);
  }
};
