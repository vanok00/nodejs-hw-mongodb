import mongoose from "mongoose";

const { model, Schema, models } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const UsersCollection = models.users || model("users", userSchema);
