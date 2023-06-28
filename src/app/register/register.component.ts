import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {CardService} from "../services/card.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router, private cardService: CardService) {}
  name: string = "";
  age: number = 0;
  username: string = "";
  password: string = "";

  register() {
    if(this.age >= 18) {
      this.userService.signup(this.name, this.age, this.username, this.password).subscribe({
        next: () => {
          alert("Successfully Signed Up!");
          this.router.navigate(["/login"])
        },
        error: err => {
          alert("Error Signing Up!");
        }
      });
    } else{
      alert("You need to be at least 18 years old!");
    }
  }
}
