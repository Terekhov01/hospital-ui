import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OurdoctorsService} from "../OurDoctorsInClinic/ourdoctors.service";
import {ResponceStatisticEmployment} from "./responce-statistic-employment";

@Component({
  selector: 'app-doctor-statistic-employment',
  templateUrl: './doctor-statistic-employment.component.html',
  styleUrls: ['./doctor-statistic-employment.component.css']
})
export class DoctorStatisticEmploymentComponent implements OnInit {

  id: number;
  statistic: ResponceStatisticEmployment[];
  statisticDoctorForm: FormGroup;
  // statistic: ResponseStatisticJson;
  change: string;
  numberov: number;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData = [];

  constructor(private route: ActivatedRoute,
              private router: Router, private userService: OurdoctorsService) {
  }

  ngOnInit(): void {

    this.getDoctorsEmployment();
  }

  private getDoctorsEmployment() {
    this.userService.getDoctorsEmployment().subscribe(data => {
      this.statistic = data;

      this.barChartData = [{
        data: [...this.statistic.map(value => value.sum)],
        label: 'Количество работающих врачей'
      }];

      this.barChartLabels = [...this.statistic.map(value => value.month.toString().split("T")[0])];
    })
    // this.barChartLabels = [...Array(12)].map((e, i) => `${i + 1}`);
  }
}
