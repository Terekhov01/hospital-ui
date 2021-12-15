import { Component, OnInit } from '@angular/core';
import {MedCardService} from "../med-card.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedCard} from "../med-card";

@Component({
  selector: 'app-contr',
  templateUrl: './contr.component.html',
  styleUrls: ['./contr.component.css']
})
export class ContrComponent implements OnInit {
  title = "Medical Card";
  medCard: MedCard;
  constructor(private medCardService: MedCardService,
              private router: Router) {
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    this.medCardService.getAll(0).subscribe(data => {
      this.medCard = data;
    });
  }
  edit(){
    this.router.navigate(['medCard/edit-contr'])
  }

}
