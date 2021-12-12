import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DoctorService} from "../user/user/doctor.service";
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorRequest} from "../user/user/doctor-request.model";

registerLocaleData(localeRu);

@Component({
  selector: 'app-add-user',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  // user: User = new User();
  user: DoctorRequest;
  today: number = Date.now();

  // @ts-ignore
  adddoctorform: FormGroup;

  constructor(private router: Router, private userService: DoctorService) {

    this.user = {
      // id: 0,

      firstname: '',
      lastname: '',
      //------
      dateOfEmployment: '',
      education: '',
      room: {
        num: 0
      },
      specialist: [{
        specialization: ''
      }]
    }
  }


  // createUser(): void {
  //   this.userService.createUser(this.user)
  //     .subscribe( data => {
  //       alert("User created successfully.");
  //     });
  //
  // };
//this.user
  createUser(): void {
    this.user.firstname = this.adddoctorform?.get('firstname')?.value;
    this.user.lastname = this.adddoctorform?.get('lastname')?.value;
    this.user.education = this.adddoctorform?.get('education')?.value;
    this.user.room = this.adddoctorform?.get('room')?.value;
    this.user.specialist[0].specialization = this.adddoctorform?.get('specialist')?.value;
    console.log(this.user);

    this.userService.createDoctor(this.user)
      .subscribe(data => {
        alert("User created successfully.");
        this.goToDoctorList()
      });

  };

  goToDoctorList() {
    this.router.navigate(['/doctorlist']);
  }

  ngOnInit(): void {

    this.adddoctorform = new FormGroup({

      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      education: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required),
      specialist: new FormControl('', Validators.required)

//----
    })
  }


}
