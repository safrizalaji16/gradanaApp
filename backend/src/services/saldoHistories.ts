import { SaldoHistoryModel } from "../db/saldoHistories";

export const getSaldoHistoriesWithUserInfo = async () =>
  await SaldoHistoryModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $sort: { createdAt: -1 } },
  ]);
export const createSaldoHistory = (values: Record<string, any>) =>
  new SaldoHistoryModel(values)
    .save()
    .then((saldoHistory) => saldoHistory.toObject());
