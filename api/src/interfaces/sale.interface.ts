import { SaleState } from "../enums/saleState.enum";
import { Card } from "./card.interface";
import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Sale {
  id?: string;
  products: Product[];
  state: SaleState;
  purchaser: string;
  card?: Card;
  delivery?: string;
  saleDate?: Date | string;
  deliveryDate?: Date | string;
  selledPrice?: number;
  amount?: number;
  deadline?: Date | string;
}
