import {Money} from "./money";
import {Transaction} from "./transaction";

export interface Card  {
  id?: number;
  iban: string;
  cardType?: string;
  money?: Money[];
  sendTrn: Transaction[],
  receiveTrn: Transaction[]
}
