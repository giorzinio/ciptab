import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../app/providers/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl:NavController, 
    public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.loadUserCredentials();
      if (this.auth.AuthToken) {                
        this.navCtrl.navigateRoot('tabs');
      } else {
        this.navCtrl.navigateRoot('login');
      }
      //this.navCtrl.navigateRoot('login');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
