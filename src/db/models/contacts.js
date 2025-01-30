import { required } from "joi";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { tye: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const UsersCollection = modle("users", userSchema);

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      default: "personal",
      enum: ["work", "home", "personal"],
    },
  },
  {
    timestamps: true,
  }
);

export const ContactsCollection = model("contacts", contactsSchema);
