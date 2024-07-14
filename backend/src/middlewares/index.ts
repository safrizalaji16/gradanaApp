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
      return res
        .status(401)
        .json({ error: "Unauthorized. Missing session token.", status: 401 });
    }

    const user = await getUserBySessionToken(sessionToken).select(
      "+authentication.sessionToken"
    );

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Invalid session token.", status: 401 });
    }

    merge(req, { identity: user });

    return next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error.", status: 500 });
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
      return res.status(403).json({ error: "Forbidden. Not the owner." });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
