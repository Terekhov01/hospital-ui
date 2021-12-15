import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  count: number;
  constructor() {this.count = 6212}

  ngOnInit(): void {
  }

}
