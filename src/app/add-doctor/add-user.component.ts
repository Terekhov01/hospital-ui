import { Component } from '@angular/core';
import {User} from "../user/user/user.models";
import {Router} from "@angular/router";
import {UserService} from "../user/user/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {

  user: User = new User();

  constructor(private router: Router, private userService: UserService) {

  }



  createUser(): void {
    this.userService.createUser(this.user)
      .subscribe( data => {
        alert("User created successfully.");
      });

  };

}
