import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ResponseStatistic} from "./response-statistic";
import {ActivatedRoute, Router} from "@angular/router";
import {OurdoctorsService} from "../OurDoctorsInClinic/ourdoctors.service";
import {ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-doctor-statistic-line',
  templateUrl: './doctor-statistic-line.component.html',
  styleUrls: ['./doctor-statistic-line.component.css']
})
export class DoctorStatisticLineComponent implements OnInit {

  id: number;
  statistic: ResponseStatistic[];
  statisticDoctorForm: FormGroup;
  // statistic: ResponseStatisticJson;
  change: string;
  numberov: number;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // public lineChartLabels = ['2000', '2001', '2002', '2003', '2004', '2005', '2006'];
  // public lineChartType = 'line';
  // public lineChartLegend = true;
  // public lineChartData = [
  //   // {data: [], label: 'Доктор 1'},
  //   // {data: [48, 38, 65, 39, 66, 17, 80], label: 'Доктор 3'}
  // ];

  public barChartLabels = ['2015', '2016', '2017', '2018', '2019', '2020'];
  public barChartType  = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData = [
    { data: [65, 67, 70, 75, 80, 90], label: 'PHP' },
    { data: [50, 48, 47, 49, 44, 40], label: '.Net' },
    { data: [40, 30, 28, 25, 22, 20], label: 'Java' },
  ];



  constructor(private route: ActivatedRoute,
              private router: Router, private userService: OurdoctorsService) {
  }

  ngOnInit(): void {

    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getDoctorStatistic();

  }

  private getDoctorStatistic() {
    console.log(this.id)
    this.userService.getDoctorStatistic(this.id).subscribe(data => {
      // @ts-ignore
      // data.rating = parseInt(data.rating);
      this.statistic = data;

      var userTestStatus = [
        {count: 0, date: '2022-01-01T00:00:00'},
        {count: 0, date: '2022-02-01T00:00:00'},
        {count: 0, date: '2022-03-01T00:00:00'},
        {count: 0, date: '2022-04-01T00:00:00'},
        {count: 0, date: '2022-05-01T00:00:00'},
        {count: 0, date: '2022-06-01T00:00:00'},
        {count: 0, date: '2022-07-01T00:00:00'},
        {count: 0, date: '2022-08-01T00:00:00'},
        {count: 0, date: '2022-09-01T00:00:00'},
        {count: 0, date: '2022-10-01T00:00:00'},
        {count: 0, date: '2022-11-01T00:00:00'},
        {count: 0, date: '2022-12-01T00:00:00'}
      ];

      for (var i = 0, len = this.statistic.length; i < len; i++) {


        if (this.statistic[i].date != null) {
          var splitted = this.statistic[i].date.toString().split("-")[1];
          console.log(splitted);
          var numberov = Number(splitted);
          if(numberov>10){
            //
            numberov =Number(numberov.toString().substr(1));
          }
          userTestStatus[numberov-1].count =this.statistic[i].count;
        }
        console.log(userTestStatus);
      }


      // this.lineChartLabels = data.date;
      // this.lineChartData = [{
      //   data: [...this.statistic.map(value => {
      //     return value.count;
      //   })], label: 'Доктор 1'
      // }];

      // this.lineChartData = [{
      //   data: [...userTestStatus.map(value => {
      //     return value.count;
      //   })], label: 'Доктор'
      // }];

      this.barChartData = [{
        data: [...userTestStatus.map(value => {
          return value.count;
        })], label: 'Доктор'
      }];

      var dt = new Date();
      var month = dt.getMonth();
      var year = dt.getFullYear();
      // this.lineChartLabels = [...Array(new Date(year, month, 0).getDate())].map((e, i) => `${i+1}`);
      // this.lineChartLabels = [...Array(12)].map((e, i) => `${i+1}`);

      // this.lineChartLabels = [...Array(12)].map((e, i) => `${i + 1}`);
      this.barChartLabels = [...Array(12)].map((e, i) => `${i + 1}`);

    })


  }
}
