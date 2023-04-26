import mongoose from "mongoose";

const { Schema } = mongoose;

export const cardSchema = new Schema({
  cardType: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  CVV: { type: Number, required: true },
});
