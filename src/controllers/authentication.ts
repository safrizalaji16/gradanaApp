import express from "express";

import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { createUser, getUserByEmail } from "../services/users";
import { generateToken } from "../helpers/jwt";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !password || !phoneNumber) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = await createUser({
      username,
      email,
      phoneNumber,
      authentication: {
        password: await hashPassword(password),
      },
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select("+authentication.password");

    if (!user) {
      return res.sendStatus(400);
    }

    const comparedPassword = await comparePassword(
      password,
      user.authentication.password
    );

    if (!comparedPassword) {
      return res.sendStatus(401);
    }

    user.authentication.sessionToken = generateToken({
      _id: user._id,
    });

    await user.save();

    res.cookie("token", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};