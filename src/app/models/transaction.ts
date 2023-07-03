import {Card} from "./card";

export interface Transaction {
  id: number,
  sender: Card,
  receiver: Card,
  money: number,
  note: string,
  date: Date
}
