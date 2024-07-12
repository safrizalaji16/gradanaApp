import { SaldoHistoryModel } from "../db/saldoHistories";

export const getSaldoHistories = () => SaldoHistoryModel.find();
export const getSaldoHistoryById = (id: string) =>
  SaldoHistoryModel.findById(id);
export const getSaldoHistoriesWithUserInfo = async () => {
  const result = await SaldoHistoryModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ]);
  return result;
};
export const createSaldoHistory = (values: Record<string, any>) =>
  new SaldoHistoryModel(values)
    .save()
    .then((saldoHistory) => saldoHistory.toObject());