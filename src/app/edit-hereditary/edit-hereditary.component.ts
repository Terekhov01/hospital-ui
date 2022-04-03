import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MedCard} from "../med-card";
import {MedCardService} from "../med-card.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-hereditary',
  templateUrl: './edit-hereditary.component.html',
  styleUrls: ['./edit-hereditary.component.css']
})
export class EditHereditaryComponent implements OnInit {
  title = "Медицинская карта";
  hereditary: string;
  medCard: MedCard;
  constructor(private medCardService: MedCardService,
              private router: Router,
              private actRoute: ActivatedRoute) {
    this.hereditary = "";
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    this.medCardService.getAll(this.actRoute.snapshot.params.id).subscribe(data => {
      this.medCard = data;
    });
  }
  update(){
    this.medCardService.editHereditary(this.actRoute.snapshot.params.id, this.hereditary).subscribe(data =>{
    });
    this.router.navigate(['medCard', this.actRoute.snapshot.params.id]);
  }

  submit(){
    this.update();
  }
}
