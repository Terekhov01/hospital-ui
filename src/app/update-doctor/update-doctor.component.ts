import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user/user.service";
import {User} from "../user/user/user.models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {

  id?: number;
  user: User = new User();
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getEmployeeById(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.userService.updateEmployee(this.id, this.user).subscribe( data =>{
        this.goToEmployeeList();
      }
      , error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
}
