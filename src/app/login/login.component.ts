import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  protected username: string = "";
  protected password: string = "";
  
  protected invalidPincode: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

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
