import express from "express";

import {
  deleteUserById,
  getUserById,
  updateUserById,
  getUsersWithSaldoHistoriesInfo,
  getUserLoggedIn,
} from "../services/users";
import { hashPassword } from "../helpers/bcrypt";
import { get } from "lodash";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsersWithSaldoHistoriesInfo();
    res.status(200).json(users).end();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

export const getLoggedInUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cookie = get(req, "identity.authentication.sessionToken") as string;
    const users = await getUserLoggedIn(cookie);

    res.status(200).json(users[0]).end();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    let user = await getUserById(id).select("+authentication.password");

    if (!user) {
      return res.sendStatus(404);
    }

    const { password, username, phoneNumber, email } = req.body;

    if (password && password !== user.authentication.password) {
      user.authentication.password = await hashPassword(password);
    }

    user.username = username;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.updatedAt = new Date();

    await updateUserById(id, user);

    res.status(200).json({ msg: "User updated successfully" }).end();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
