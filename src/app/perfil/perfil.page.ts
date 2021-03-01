import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../providers/auth/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any;
  constructor(public navCtrl:NavController, public auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.AuthToken
  }

  navegar(url) {
    this.navCtrl.navigateForward(url);
  }
  exit() {
    this.auth.destroyUserCredentials();
    this.navCtrl.navigateRoot('login');
  }
}
