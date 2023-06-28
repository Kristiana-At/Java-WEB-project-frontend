import {Component} from '@angular/core';
import {CardService} from "../services/card.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardOwner} from "../models/user";
import {Card} from '../models/card';
import {Money} from "../models/money";
import {Transaction} from "../models/transaction";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private cardService: CardService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  currency = "BGN";
  money = 0;

  moneyToAdd = 0;
  currencyToAdd = "BGN";

  user: CardOwner = {
    "id": 0,
    "name": "",
    "age": 0,
    "username": "",
    "password": "",
    "cards": []
  };
  card:Card = {
    "iban": "",
    "sendTrn": [],
    "receiveTrn": []
  };

  ibanTo = "";
  currencyToSend = "";
  moneyToSend = 0;
  note = "";

  currencyToExchangeFrom = "";
  currencyToExchangeTo = "";
  moneyToExchange = 0;

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user.cards?.length)
    if(this.user?.cards !== undefined) {
      this.card = this.user.cards[0];
    }
    this.loadMoney("BGN");
  }

  loadMoney(name: string): void {
    this.currency = name;
    if(this.card && this.card?.money) {
      const value = this.card?.money.find((money) => money.currency === name);
      if(value){
        this.money = value.money;
      } else {
        this.money = 0;
      }
    }
  }

  reloadUserData(currency: string, iban:string) {
    this.userService.login(this.user.username, this.user.password).subscribe(
      res => {
        this.userService.setUser(res);
        this.user = res;
        this.loadCard(iban, currency);
      }
    )
  }

  loadForm(): void {
    const form = document.getElementById("popup-form") as HTMLDivElement;

    form.classList.toggle("hidden");
  }

  loadForm1(): void {
    const form = document.getElementById("popup-form1") as HTMLDivElement;

    form.classList.toggle("hidden");
  }

  loadForm2(): void {
    const form = document.getElementById("popup-form2") as HTMLDivElement;

    form.classList.toggle("hidden");
  }

  addMoney(): void {
    const select = document.getElementById("cars") as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex] as HTMLOptionElement;
    this.currencyToAdd = selectedOption.value;

    if (this.card != undefined && this.card.iban !== undefined) {
      this.cardService.addMoney(this.card.iban, this.moneyToAdd, this.currencyToAdd).subscribe({
        next:() => {
          this.loadForm();
          this.reloadUserData(this.currencyToAdd, this.card.iban);
        },
        error: err => {
          alert("NOT successfully added!");
        }
      });
    }
  }

  sendMoney(): void {
    const select = document.getElementById("curr") as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex] as HTMLOptionElement;
    this.currencyToSend = selectedOption.value;

    if (this.card != undefined && this.card.iban !== undefined) {
      this.cardService.sendMoney(this.card.iban, this.ibanTo, this.moneyToSend, this.currencyToSend, this.note).subscribe({
        next:() => {
          alert("Successfully sent!");
          this.reloadUserData(this.currencyToAdd, this.card.iban);
          this.loadForm1()
        },
        error: err => {
          alert("NOT successfully sent!");
        }
      });
    }
  }

  exchangeMoney() {
    const select1 = document.getElementById("fromCur") as HTMLSelectElement;
    const selectedOption1 = select1.options[select1.selectedIndex] as HTMLOptionElement;
    this.currencyToExchangeFrom = selectedOption1.value;

    const select2 = document.getElementById("toCur") as HTMLSelectElement;
    const selectedOption2 = select2.options[select2.selectedIndex] as HTMLOptionElement;
    this.currencyToExchangeTo = selectedOption2.value;

    if (this.card != undefined && this.card.iban !== undefined) {
      this.cardService.exchangeMoney(this.card.iban, this.moneyToExchange, this.currencyToExchangeFrom, this.currencyToExchangeTo).subscribe({
        next:() => {
          alert("Successfully exchanged!");
          this.reloadUserData(this.currencyToExchangeFrom, this.card.iban);
          this.loadForm2()
        },
        error: err => {
          alert("NOT successfully exchanged!");
        }
      });
    }
  }

  logOut() {
    this.router.navigate(["/login"])
  }

  loadCard(iban: string, currency: string) {
    const value = this.user.cards?.find((card) => card.iban === iban);
    if(value !== undefined) {
      this.card = value;
      this.loadMoney(currency);
    }
  }

  goToHistory() {
    this.router.navigate(["/history"])
  }
}
