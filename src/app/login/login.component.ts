import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {CardService} from "../services/card.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private userService: UserService, private router: Router, private cardService: CardService) {}
  username: string = "";
  password: string = "";

  invalidPincode: boolean = false;

  login():void{
    this.userService.login(this.username, this.password).subscribe({
      next:(res) => {
        this.userService.setUser(res)

          if (res.cards.length !== 0)
            this.router.navigate(['/home'])

           else
            this.router.navigate(['/new-card'])

      },
      error: () => {
        alert("Invalid credentials");
        this.invalidPincode = true;
      }
    })
  }

  ngOnInit(): void {
  }

}
