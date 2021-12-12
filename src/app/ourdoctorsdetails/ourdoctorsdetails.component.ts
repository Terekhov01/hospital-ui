import {Component, OnInit} from '@angular/core';
import {DoctorRatingRequest} from "./doctor-rating-request.model";
import {ActivatedRoute, Router} from "@angular/router";
import {OurdoctorsService} from "../ourdoctors/ourdoctors.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ourdoctorsModel} from "../ourdoctors/ourdoctors.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ourdoctorsdetails',
  templateUrl: './ourdoctorsdetails.component.html',
  styleUrls: ['./ourdoctorsdetails.component.css']
})
export class OurdoctorsdetailsComponent implements OnInit {

  doctorId?: number;
  doctorRating: DoctorRatingRequest;

  ourusers?: ourdoctorsModel[];
  // @ts-ignore
  updateRatingForm: FormGroup;

  private subscription?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private userService: OurdoctorsService) {

    this.subscription = route.params.subscribe(params => this.doctorId = params['id']);
//     console.log("конструктор");
// console.log(this.doctorId);

    this.doctorRating = {
      rating: 0,
      feedback: '',
      // @ts-ignore
      doctorId: this.doctorId,
      userId: 1 //fixme hardcode ass


    }


  }

  ngOnInit(): void {
    console.log(this.doctorRating);

    this.updateRatingForm = new FormGroup({


      rating: new FormControl('', Validators.required),
      feedback: new FormControl('', Validators.required),
      doctorId: new FormControl('', Validators.required)


    })

    // this.doctorId = this.route.snapshot.params['doctorId'];

  }

  //  addRating(): void {
  // this.
  //
  //
  //  }

  onSubmit(): void {
    console.log(this.doctorRating);
//goToDoctorList()
//  id =

    this.doctorRating.rating = this.updateRatingForm?.get('rating')?.value;
    this.doctorRating.feedback = this.updateRatingForm?.get('feedback')?.value;
    // @ts-ignore
    this.doctorRating.doctorId = this.doctorId;
    console.log(this.doctorRating);

    this.userService.updateDoctorRating(this.doctorRating)
      .subscribe(data => {
        alert("User created successfully.");
        this.goToDoctorList()
      });

  };


  goToDoctorList() {
    this.router.navigate(['/ourdoctors']);
  }


}
