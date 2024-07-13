import { UserModel } from "../db/users";

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserLoggedIn = async (sessionToken: string) =>
  await UserModel.aggregate([
    {
      $match: { "authentication.sessionToken": sessionToken },
    },
    {
      $lookup: {
        from: "saldohistories",
        localField: "_id",
        foreignField: "userId",
        as: "saldoHistories",
      },
    },
  ]);
export const getUsersWithSaldoHistoriesInfo = async () =>
  await UserModel.aggregate([
    {
      $lookup: {
        from: "saldohistories",
        localField: "_id",
        foreignField: "userId",
        as: "saldoHistories",
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        saldo: 1,
        email: 1,
        saldoHistories: 1,
      },
    },
  ]);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
