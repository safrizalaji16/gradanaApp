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
    res.status(500).json({ error: "Internal server error.", status: 500 });
  }
};

export const getLoggedInUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cookie = get(req, "identity.authentication.sessionToken") as string;
    const users = await getUserLoggedIn(cookie);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found.", status: 404 });
    }

    res.status(200).json(users[0]).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error.", status: 500 });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found.", status: 404 });
    }

    res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error.", status: 500 });
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
      return res.status(404).json({ error: "User not found.", status: 404 });
    }

    const { password, username, phoneNumber, email } = req.body;

    if (password && password !== user.authentication.password) {
      user.authentication.password = await hashPassword(password);
    }

    user.username = username || user.username;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.email = email || user.email;
    user.updatedAt = new Date();

    await updateUserById(id, user);

    res
      .status(200)
      .json({ msg: "User updated successfully", status: 200 })
      .end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error.", status: 500 });
  }
};
