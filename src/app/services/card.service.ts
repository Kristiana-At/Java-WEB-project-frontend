import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Card} from "../models/card";
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
}
