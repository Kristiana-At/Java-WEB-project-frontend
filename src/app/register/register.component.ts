import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  protected name: string = "";
  protected age: number = 0;
  protected username: string = "";
  protected password: string = "";
  
  constructor(private userService: UserService, private router: Router) {}
  
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
    } else
      alert("You need to be at least 18 years old!");
    
  }
}
