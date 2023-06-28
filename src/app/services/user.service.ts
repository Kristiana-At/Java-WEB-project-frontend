import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CardOwner} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: CardOwner = {
    "id": 0,
    "name": "",
    "age": 0,
    "username": "",
    "password": "",
    "cards": []
  };

  constructor(private httpCLient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.httpCLient.get('http://localhost:8080/user/login', {params});
  }

  signup(name: string, age: number, username: string, password: string): Observable<any>{
    return this.httpCLient.post('http://localhost:8080/user/create', {
      "name": name,
      "age": age,
      "username": username,
      "password": password
    });
  }

  setUser(user: CardOwner){
    this.user = user;
  }
}
