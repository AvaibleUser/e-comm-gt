import { ProductCategory } from "../enums/productCategory.enum";
import { ProductState } from "../enums/productState.enum";
import { User } from "./user.interface";

export interface Product {
  id?: string;
  name: string;
  description: string;
  seller: string;
  imageUri: string;
  price: number;
  amount: number;
  state: ProductState;
  category: ProductCategory;
}
