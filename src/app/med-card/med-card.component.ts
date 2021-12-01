import { Component, OnInit } from '@angular/core';
import {MedCard} from "../med-card";
import {MedCardService} from "../med-card.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-med-card',
  templateUrl: './med-card.component.html',
  styleUrls: ['./med-card.component.css']
})
export class MedCardComponent implements OnInit {
  title = "Medical Card";
  medCard: MedCard;

  constructor(private medCardService: MedCardService,
              private router: Router) {
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    this.medCardService.getAll().subscribe(data => {
      this.medCard = data;
    });
  }

  getHereditary(){
    this.router.navigate(['medCard/hereditary'])
  }
  editHereditary(){
    this.router.navigate(['medCard/edit-hereditary'])
  }
  getContr(){
    this.router.navigate(['medCard/contraindications'])
  }
  editContr(){
    this.router.navigate(['medCard/edit-contr'])
  }
}
