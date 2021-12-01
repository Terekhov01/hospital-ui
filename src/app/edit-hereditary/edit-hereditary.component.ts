import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MedCard} from "../med-card";
import {MedCardService} from "../med-card.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-hereditary',
  templateUrl: './edit-hereditary.component.html',
  styleUrls: ['./edit-hereditary.component.css']
})
export class EditHereditaryComponent implements OnInit {
  title = "Medical Card";
  hereditary: string;
  medCard: MedCard;
  constructor(private medCardService: MedCardService,
              private router: Router) {
    this.hereditary = "";
    this.medCard = new MedCard();
  }

  ngOnInit(): void {
    this.medCardService.getAll().subscribe(data => {
      this.medCard = data;
    });
  }
  update(){
    this.medCardService.editHereditary(this.hereditary).subscribe(data =>{
    });
    this.router.navigate(['medCard'])
  }

  submit(){
    this.update();
  }
}