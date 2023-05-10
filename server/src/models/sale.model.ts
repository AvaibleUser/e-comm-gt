import mongoose from "mongoose";
import { cardSchema } from "./card.model";

const { Schema, model } = mongoose;

export const saleSchema = new Schema(
  {
    purchaser: { type: String, minLength: 3, required: true },
    delivery: { type: String, minLength: 3, required: true },
    products: [],
    saleDate: Date,
    deliveryDate: Date,
    card: cardSchema,
    deadline: Date,
    state: {
      default: "shopping",
      type: String,
      required: true,
      enum: {
        values: ["shopping", "indelivery", "delivered"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { collection: "sale" }
);

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

export const saleModel = model("sale", saleSchema);
