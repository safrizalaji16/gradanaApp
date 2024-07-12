import mongoose from "mongoose";

const SaldoHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["topup", "withdraw"],
    required: true,
    default: "topup",
  },
  saldo: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const SaldoHistoryModel = mongoose.model(
  "SaldoHistory",
  SaldoHistorySchema
);
