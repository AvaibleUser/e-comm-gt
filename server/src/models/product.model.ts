import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const productSchema = new Schema(
  {
    name: { type: String, minLength: 3, required: true },
    description: { type: String, required: true },
    seller: { type: String, minLength: 3, required: true },
    imageUri: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    amount: { type: Number, min: 0, required: true },
    state: {
      default: "unverified",
      type: String,
      required: true,
      enum: {
        values: ["unverified", "onsale", "refused"],
        message: "{VALUE} is not supported",
      },
    },
    category: {
      default: "other",
      type: String,
      required: true,
      enum: {
        values: [
          "technology",
          "household",
          "academic",
          "literature",
          "decoration",
          "other",
        ],
        message: "{VALUE} is not supported",
      },
    },
  },
  { collection: "product" }
);

productSchema.set("toJSON", {
  transform: (_doc, product) => {
    product.id = product._id.toString();
    delete product._id;
    delete product.__v;
  },
});

productSchema.set("toObject", {
  transform: (_doc, product) => {
    product.id = product._id.toString();
    delete product._id;
    delete product.__v;
  },
});

productSchema.index({ name: 1 }, { unique: true });

export const productModel = model("product", productSchema);
