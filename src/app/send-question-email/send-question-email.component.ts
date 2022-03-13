import { Component, OnInit } from '@angular/core';
import {RequestMailModel} from "./responceemail/request-mail.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OurdoctorsService} from "../OurDoctorsInClinic/ourdoctors.service";

@Component({
  selector: 'app-send-question-email',
  templateUrl: './send-question-email.component.html',
  styleUrls: ['./send-question-email.component.css']
})
export class SendQuestionEmailComponent implements OnInit {

  emailRequest: RequestMailModel;

  isReady : true;

  emailform: FormGroup;
  constructor(private router: Router, private ourdoctors: OurdoctorsService) {

    this.emailRequest = {
      // id: 0,

      firstname: '',
      phone: '',
      //------
      email: '',
      message: '',

    }
  }



  ngOnInit(): void {

        this.emailform = new FormGroup({
      firstname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
          })

  }

  sendEmail():void {
    this.emailRequest.firstname= this.emailform?.get('firstname')?.value;
    this.emailRequest.phone= this.emailform?.get('phone')?.value;
    this.emailRequest.email= this.emailform?.get('email')?.value;
    this.emailRequest.message= this.emailform?.get('message')?.value;

    console.log(this.emailRequest);

    this.ourdoctors.sendYourEmail(this.emailRequest)
      .subscribe(data => {
        alert("Ваше сообщение успешно отправлено.");
        this.goToMainPage()
      });
  }

  goToMainPage() {
    this.router.navigate(['/home']);
  }


  // verify(){
  //   if(!document.getElementById('id_remarks').trim().length){
  //     alert("Имя не может быть пустым ");
  //   }
  // }


}
