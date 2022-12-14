import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorService} from "../DoctorInList/doctorList/doctor.service";
import {User} from "../DoctorInList/doctorList/doctor.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { PopUpMessageService } from '../_services/pop-up-message.service';

@Component({
    selector: 'app-update-doctor',
    templateUrl: './update-doctor.component.html',
    styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {

    id?: number;
    user: User;

    // @ts-ignore
    updatedoctorform: FormGroup;

    constructor(private userService: DoctorService,
                private route: ActivatedRoute,
                private router: Router, private popUpMessageService: PopUpMessageService) {

        this.user = {
            id: 0,
            firstname: '',
            lastname: '',
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

    ngOnInit(): void {

        this.updatedoctorform = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            education: new FormControl('', Validators.required),
            room: new FormControl('', Validators.required),
            specialist: new FormControl('', Validators.required),
            id: new FormControl('', Validators.required),
            dateOfEmployment: new FormControl('', Validators.required)

        })

        this.id = this.route.snapshot.params['id'];

        // console.log(this.id);
        this.userService.getDoctorByID(this.id).subscribe(data => {
                this.user = data;
                console.log(this.user)

            },
            error => console.log(error));
    }

    onSubmit(): void {
        console.log(this.user);
        this.user.id = this.updatedoctorform?.get('id')?.value;
        this.user.firstname = this.updatedoctorform?.get('firstname')?.value;
        this.user.lastname = this.updatedoctorform?.get('lastname')?.value;
        this.user.dateOfEmployment = this.updatedoctorform?.get('dateOfEmployment')?.value;
        this.user.education = this.updatedoctorform?.get('education')?.value;
        this.user.room.num = this.updatedoctorform?.get('room')?.value;
        this.user.specialist[0].specialization = this.updatedoctorform?.get('specialist')?.value;
        console.log(this.user);
        this.userService.updateDoctor(this.user)
            .subscribe(data =>
            {
                this.popUpMessageService.displayConfirmation("???????????????????? ?? ?????? ?????????????? ??????????????????");
                //alert("User update successfully.");
                this.goToDoctorList()
            });
    }

    goToDoctorList() {
        this.router.navigate(['/doctorlist']);
    }
}
