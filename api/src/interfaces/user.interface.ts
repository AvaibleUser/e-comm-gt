import { UserType } from "../enums/userType.enum";
import { Card } from "./card.interface";

export interface User {
  id?: string;
  name: string;
  lastname: string;
  username: string;
  password: string;
  creditCards: Card[];
  userType: UserType;
}
