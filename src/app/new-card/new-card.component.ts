import { Component } from '@angular/core';
import {CardService} from "../services/card.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardOwner} from "../models/user";
import {CreateCardResource} from "../models/create-card";
import {Card} from "../models/card";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent {
  constructor(private cardService: CardService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  createCardResource: CreateCardResource = {
    "cardType": "VISA",
    "cardOwnerId": 0
  }

  ngOnInit(): void {
  }

  createCard(cardType: string) {
    if(this.userService.user !== undefined) {
      this.createCardResource.cardOwnerId = this.userService.user.id;
    }
    this.createCardResource.cardType = cardType;
    this.cardService.createCard(this.createCardResource).subscribe(res=>{
      this.userService.login(this.userService.user.username, this.userService.user.password).subscribe(
        updatedUser => {
          this.userService.setUser(updatedUser);
          this.router.navigate(["/home"])
        });
    });
  }

  logOut() {
    this.router.navigate(["/login"])
  }
}
