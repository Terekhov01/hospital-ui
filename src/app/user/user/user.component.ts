import { Component, OnInit } from '@angular/core';
import {User} from "./user.models";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users?: User[];
  id?: number ;

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  };

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {


        // @ts-ignore
        this.users = this.users.filter(u => u !== user);
      })
  };

  // findUser(id: number): void {
  //   // @ts-ignore
  //   this.userService.findUser(id)
  //     .subscribe( data => {
  //       alert("User found");
  //     });
  //
  // };

}
