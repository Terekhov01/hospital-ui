import { Component, OnInit } from '@angular/core';
import {ServiceServiceService} from "../service-service.service";
import {Service} from "../service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  patientAmount: number = 589;
  doctorAmount: number = 136;
  services: Service[];
  popularService: Service;
  constructor(private serviceService: ServiceServiceService) {
  }
  ngOnInit(): void {
    this.serviceService.getServicesList().subscribe(data => {
      this.services = data;
    });

  }

}
