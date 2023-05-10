import mongoose from "mongoose";
import { cardSchema } from "./card.model";

const { Schema, model } = mongoose;

export const userSchema = new Schema(
  {
    name: { type: String, minLength: 3, required: true },
    lastname: { type: String, minLength: 3, required: true },
    username: { type: String, minLength: 3, required: true },
    password: { type: String, minLength: 3, required: true },
    creditCards: [cardSchema],
    userType: {
      default: "seller",
      type: String,
      required: true,
      enum: {
        values: ["seller", "packer", "admin"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { collection: "user" }
);

userSchema.set("toJSON", {
  transform: (_doc, user) => {
    user.id = user._id.toString();
    delete user._id;
    delete user.__v;
  },
});

userSchema.set("toObject", {
  transform: (_doc, user) => {
    user.id = user._id.toString();
    delete user._id;
    delete user.__v;
  },
});

export const userModel = model("user", userSchema);
