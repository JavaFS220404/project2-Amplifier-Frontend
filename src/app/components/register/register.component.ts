import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUsername:string = "";
  newPassword:string = "";
  newFirstName:string = "";
  newLastName:string = "";
  newEmail:string = "";

  errorMessage:string = "";

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    let user:User = new User(0,this.newUsername,this.newPassword, this.newFirstName, this.newLastName,
                            this.newEmail);
    this.userService.registerUser(user).subscribe({
      next:()=>{
        this.router.navigate(["/login"]);
        console.log("Registration successful!")
      },
      error:()=>{
        this.errorMessage = "There was a problem with the Registration. Try another Username!"; 
      }
    });
  }

}
