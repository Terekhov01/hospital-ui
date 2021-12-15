import { Component, OnInit } from '@angular/core';
import {MedCard} from "../med-card";
import {MedCardService} from "../med-card.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-contr',
  templateUrl: './edit-contr.component.html',
  styleUrls: ['./edit-contr.component.css']
})
export class EditContrComponent implements OnInit {
  title = "Medical Card";
  contr: string;
  medCard: MedCard;
  constructor(private medCardService: MedCardService,
              private router: Router) {
    this.contr = "";
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    this.medCardService.getAll(0).subscribe(data => {
      this.medCard = data;
    });
  }
  update(){
    this.medCardService.editContr(0, this.contr).subscribe(data =>{
    });
    this.router.navigate(['medCard']);
  }


}
