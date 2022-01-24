import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ourdoctorsModel} from "../OurDoctors/ourdoctors.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OurdoctorsService} from "../OurDoctors/ourdoctors.service";
import {DoctorRequest} from "../DoctorInList/doctorList/doctor-request.model";

@Component({
  selector: 'app-doctorinfo',
  templateUrl: './doctorinfo.component.html',
  styleUrls: ['./doctorinfo.component.css']
})
export class DoctorinfoComponent implements OnInit {

  id?: number;

  // @ts-ignore
  ourusers: DoctorRequest;

  // @ts-ignore
  doctorInfo: ourdoctorsModel;

  // @ts-ignore
  infoDoctorForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router, private userService: OurdoctorsService) {
  }

  ngOnInit(): void {

    this.infoDoctorForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      education: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required),
      specialist: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      dateOfEmployment: new FormControl('', Validators.required)

    })

    //this.getDoctorInfo()
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];

    this.getDoctorInfo()
  }

  goToBackList() {
    this.router.navigate(['ourdoctors']);
  }

  private getDoctorInfo() {
    console.log(this.id)
    this.userService.getDoctorsInfo(this.id).subscribe(data => {
      console.log(1, 2, 3);
      console.log(data);

      // @ts-ignore
      data.rating = parseInt(data.rating);

      this.ourusers = data;


    })
  }

}
