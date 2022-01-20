import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ourdoctorsModel} from "./ourdoctors.model";
import {OurdoctorsService} from "./ourdoctors.service";
// import {SurnamefilterPipe} from "../surnamefilter.pipe";


@Component({
  selector: 'app-ourdoctors',
  // @ts-ignore
  pipes: [SurnamefilterPipe],

  templateUrl: './ourdoctors.component.html',
  styleUrls: ['./ourdoctors.component.css'],


})
export class OurdoctorsComponent implements OnInit {

  // @ts-ignore
  ourusers: ourdoctorsModel[];
  id?: number;

  // @ts-ignore
  filterText :string;

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

// Search(){
//
//     if(this.searchText!==""){
//       let searchValue = this.searchText.toLocaleLowerCase();
//       this.ourusers = this.ourusers?.filter((firstName:any)=>
//         {
//           return this.ourusers..toLocaleLowerCase().match(searchValue);
//         });
//
//     }
// }

  search(value: string): void {
    this.ourusers = this.ourusers.filter((val)=>
    val.lastName.toLowerCase().includes(value));
  }
  }
