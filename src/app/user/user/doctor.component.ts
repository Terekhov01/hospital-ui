import {Component, OnInit} from '@angular/core';
import {User} from "./doctor.models";
import {Router} from "@angular/router";
import {DoctorService} from "./doctor.service";


@Component({
  selector: 'app-user',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  users?: User[];
  id?: number;


  constructor(private router: Router, private userService: DoctorService) {

  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe( data => {
    //     this.users = data;
    //     if (this.id) {
    //       // @ts-ignore
    //       this.getEmployeeById(this.route.snapshot.params.id);
    //     }
    //   });
    this.getADoctors()
  };

  updateDoctor(id: number) {
    console.log(id);
    let result = this.router.navigate(['update-doctor', id]);

    // @ts-ignore
    // this.users = new User(this.users);
  }

  deleteDoctor(id: number) {
    this.userService.deleteDoctor(id).subscribe(data => {
      console.log(data);
      this.getADoctors();
    })
  }

  doctorDetails(id: number) {
    let result = this.router.navigate(['doctor-details', id]);
  }

  findDoctorByID() {
    console.log(this.id);
    // this.userService.getDoctorByID(id).subscribe(data => {
    //   this.getADoctors();
    // })
  }

  updatePost(id: number): void {
    let result = this.router.navigate(['update-doctor', id]);
    // this.userService.getUsers()
    //   .subscribe(
    //     data => {
    //       this.users = data;
    //     },
    //     error => {
    //       console.error(error);
    //     });
  }

  // deleteUser(user: User): void {
  //   this.userService.deleteUser(user)
  //     .subscribe( data => {
  //
  //
  //       // @ts-ignore
  //       this.users = this.users.filter(u => u !== user);
  //     })
  // };

  // findUser(id: number): void {
  //   // @ts-ignore
  //   this.userService.findUser(id)
  //     .subscribe( data => {
  //       alert("User found");
  //     });
  //
  // };

  private getADoctors() {
    this.userService.getDoctorsList().subscribe(data => {
      this.users = data;
    })
  }


  // employeeDetails(id: number){
  //   this.router.navigate(['employee-details', id]);
  // }

//   getEmployeeById(users:User): void {
//     // @ts-ignore
//     this.router.navigateByUrl('/update-doctor',users.id);
// //       .subscribe( data => {

  // getEmployeeById(id: number,users:User): void {
  //   // @ts-ignore
  //   this.userService.getUsers(id).subscribe(     data => {
  //       this.users = data;
  //     },
  //     error => {
  //       console.error(error);
  //     });
//       .subscribe( data => {

//
// //sdfgdfgh
//
//         // @ts-ignore
//         this.users = this.users.filter(u => u !== user);
//       })
}


