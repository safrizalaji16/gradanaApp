import express from "express";

import {
  deleteUser,
  getAllUsers,
  getLogedInUser,
  updateUser,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router
    .get("/users", isAuthenticated, getAllUsers)
    .get("/users/loged-in", isAuthenticated, getLogedInUser)
    .delete("/users/:id", isAuthenticated, isOwner, deleteUser)
    .put("/users/:id", isAuthenticated, isOwner, updateUser);
};
