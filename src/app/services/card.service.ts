import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CreateCardResource} from "../models/create-card";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpCLient: HttpClient) { }

  createCard(card: CreateCardResource): Observable<any>{
    const cardType = card.cardType;
    const cardOwnerId = card.cardOwnerId;
    return this.httpCLient.post('http://localhost:8080/card/create',{
      cardType,
      cardOwnerId
    }, httpOptions);
  }

  addMoney(iban: string, money: number, currency: string): Observable<any>{
    return this.httpCLient.post('http://localhost:8080/card/add/money',{
      iban,
      money,
      currency
    }, httpOptions);
  }

  sendMoney(ibanFrom: string, ibanTo: string, money: number, currency: string, note: string): Observable<any>{
    return this.httpCLient.post('http://localhost:8080/card/send/money',{
      ibanFrom,
      ibanTo,
      money,
      currency,
      note
    });
  }

  exchangeMoney(iban: string, money: number, currencyFrom: string, currencyTo: string): Observable<any>{
    return this.httpCLient.post('http://localhost:8080/card/exchange/money',{
      iban,
      money,
      currencyFrom,
      currencyTo
    });
  }

  getTransactions(iban : string) : Observable<any>
  {
    const params = new HttpParams().set('iban', iban)
    return this.httpCLient.get('http://localhost:8080/card/transactions', {params});
  }
}
