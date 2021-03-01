import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personales',
  templateUrl: './personales.page.html',
  styleUrls: ['./personales.page.scss'],
})
export class PersonalesPage implements OnInit {

  constructor() { }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  ngOnInit() {
  }

}
