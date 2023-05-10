import {
  Product,
  ProductState,
  UserType,
} from "e-comm-gt-api";
import { productModel } from "../models/product.model";
import { userModel } from "../models/user.model";

function getSortObject(sortBy: string) {
  const sortObj = {} as any;
  sortObj[sortBy] = 1;

  return sortObj;
}

export async function findProductById(id: string) {
  const product = await productModel.findById(id);

  return product;
}

export async function findProducts(name: string, sortBy: string, extras: any) {
  Object.keys(extras).forEach((key) => extras[key] || delete extras[key]);
  const products = await productModel
    .find({
      name: { $regex: name, $options: "i" },
      ...extras,
    })
    .sort(getSortObject(sortBy));

  return products;
}

export async function insertProduct(product: Product) {
  product.state = ProductState.UNVERIFIED;

  const seller = await userModel.findOne({ username: product.seller });
  if (
    !seller ||
    !("userType" in seller) ||
    seller.userType !== UserType.SELLER
  ) {
    throw new Error("The seller user must be seller or exists");
  }
  const productSaved = await productModel.create(product);

  return productSaved;
}

export async function updateProduct(product: Product) {
  const productUpdated = await productModel.findByIdAndUpdate(
    product.id,
    product,
    { new: true }
  );

  return productUpdated;
}
