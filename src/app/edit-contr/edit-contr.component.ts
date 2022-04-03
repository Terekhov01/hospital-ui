import { Component, OnInit } from '@angular/core';
import {MedCard} from "../med-card";
import {MedCardService} from "../med-card.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-contr',
  templateUrl: './edit-contr.component.html',
  styleUrls: ['./edit-contr.component.css']
})
export class EditContrComponent implements OnInit {
  title = "Медицинская карта";
  contr: string;
  medCard: MedCard;
  constructor(private medCardService: MedCardService,
              private router: Router,
              private actRoute: ActivatedRoute, ) {
    this.contr = "";
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    this.medCardService.getAll(this.actRoute.snapshot.params.id).subscribe(data => {
      this.medCard = data;
    });
  }
  update(){
    this.medCardService.editContr(this.actRoute.snapshot.params.id, this.contr).subscribe(data =>{
    });
    this.router.navigate(['medCard', this.actRoute.snapshot.params.id]);
  }


}
