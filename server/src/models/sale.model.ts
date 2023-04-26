import mongoose from "mongoose";
import { cardSchema } from "./card.model";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, minLength: 3, required: true },
  seller: { type: String, minLength: 3, required: true },
  selledPrice: { type: Number, min: 0 },
  amount: { type: Number, min: 1, required: true },
});

export const saleSchema = new Schema({
  purchaser: { type: String, minLength: 3, required: true },
  delivery: { type: String, minLength: 3, required: true },
  products: [productSchema],
  saleDate: Date,
  deliveryDate: Date,
  card: cardSchema,
  deadline: {
    type: Date,
    default: function () {
      return (this as any).saleDate.getDate() + 1;
    },
  },
  state: {
    default: "shopping",
    type: String,
    required: true,
    enum: {
      values: ["shopping", "indelivery", "delivered"],
      message: "{VALUE} is not supported",
    },
  },
});

saleSchema.set("toJSON", {
  transform: (_doc, sale) => {
    sale.id = sale._id.toString();
    delete sale._id;
    delete sale.__v;
  },
});

saleSchema.set("toObject", {
  transform: (_doc, sale) => {
    sale.id = sale._id.toString();
    delete sale._id;
    delete sale.__v;
  },
});

export const saleModel = model("Sale", saleSchema);
