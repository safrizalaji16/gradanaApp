import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  saldo: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  authentication: {
    password: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
  },
});

UserSchema.virtual("saldoHistories", {
  ref: "SaldoHistory",
  localField: "_id",
  foreignField: "userId",
});

export const UserModel = mongoose.model("User", UserSchema);
