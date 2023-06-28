import {Card} from "./card";

export interface CardOwner  {
  id: number;
  name: string;
  age: number;
  username: string;
  password: string;
  cards?: Card[];
}
