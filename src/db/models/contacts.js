import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const UsersCollection = model("users", userSchema);

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
      default: "personal",
      enum: ["work", "home", "personal"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ContactsCollection = model("contacts", contactsSchema);
