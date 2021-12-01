import { Component, OnInit } from '@angular/core';
import {DoctorRatingRequest} from "./doctor-rating-request.model";
import {Router} from "@angular/router";
import {OurdoctorsService} from "../ourdoctors/ourdoctors.service";

@Component({
  selector: 'app-ourdoctorsdetails',
  templateUrl: './ourdoctorsdetails.component.html',
  styleUrls: ['./ourdoctorsdetails.component.css']
})
export class OurdoctorsdetailsComponent implements OnInit {

  // user: DoctorRatingRequest;

  constructor(private router: Router,private userService: OurdoctorsService) { }

  ngOnInit(): void {
    // this.user ={
    //
    //
    // }
  }

  addRating(): void {


  }
}
