import { SaleState } from "../enums/saleState.enum";
import { Card } from "./card.interface";
import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Sale {
  id?: string;
  products: Product[];
  state: SaleState;
  purchaser: User;
  card?: Card;
  delivery?: User;
  saleDate?: Date;
  deliveryDate?: Date;
  selledPrice?: number;
  amount?: number;
  deadline?: Date;
}
