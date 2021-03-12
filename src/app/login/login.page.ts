import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;
  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }
  swipeNext(){
    this.slides.slideNext();
  }
  tipo(op) {
    this.navCtrl.navigateForward('loginop');
  }
}
