import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ourdoctorsModel} from "./ourdoctors.model";
import {OurdoctorsService} from "./ourdoctors.service";

@Component({
  selector: 'app-ourdoctors',
  templateUrl: './ourdoctors.component.html',
  styleUrls: ['./ourdoctors.component.css']
})
export class OurdoctorsComponent implements OnInit {

  ourusers?: ourdoctorsModel[];
  id?: number;

  constructor(private router: Router, private userService: OurdoctorsService) {
  }

  ngOnInit(): void {
    this.getADoctors()
  }

  ourDoctorsDetails(id: number) {
    let result = this.router.navigate(['ourDoctorsDetails', id]);
  }

  doctorInfo(id: number) {
    console.log(id);
    let result = this.router.navigate(['doctorInfo', id]);

    // @ts-ignore
    // this.users = new User(this.users);
  }

  private getADoctors() {
    this.userService.getOurDoctorsList().subscribe(data => {
      console.log(data);

      // @ts-ignore
      data.rating = parseInt(data.rating);

      this.ourusers = data;


    })
  }


}
