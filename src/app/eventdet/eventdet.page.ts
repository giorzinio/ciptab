import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventdet',
  templateUrl: './eventdet.page.html',
  styleUrls: ['./eventdet.page.scss'],
})
export class EventdetPage implements OnInit {
  event : any;
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.event) {
        this.event = JSON.parse(params.event);
        console.log(this.event);
      }
    });
  }

  ngOnInit() {
  }
  masinfo(url) {
    window.open("https://wa.me/51936672319?text=Hello%20World","_self")
  }
}
