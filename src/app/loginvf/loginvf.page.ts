import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';
@Component({
  selector: 'app-loginvf',
  templateUrl: './loginvf.page.html',
  styleUrls: ['./loginvf.page.scss'],
})
export class LoginvfPage implements OnInit {
  user: any;
  uno: '';
  dos: '';
  tres: '';
  cuatro: '';
  cinco: '';
  seis: '';
  timeLeft: number = 60;
  interval;

  constructor(public navCtrl:NavController, public api: ApiService, public auth: AuthService,private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.user) {
        this.user = JSON.parse(params.user);
        this.startTimer();
      }
    });
  }

  ngOnInit() {
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {        
        this.api.getDataWithParms('/api/Envios',{ ncodcol: this.user.ncodcol, vcorcol: this.user.vcorcol })
        .then(data => {         
          this.timeLeft = 60;
        }); 
      }
    },1000)
  }
  ingresar() {
    var codverif = this.uno.toString() + this.dos.toString() + this.tres.toString() + this.cuatro.toString() + this.cinco.toString() + this.seis.toString();
    this.api.getDataWithParms('/api/Values',{ Opcion: 7,ncodcol: this.user.ncodcol, codverif: codverif,Procedure: "mobileProcedure" })
    .then(data => { 
      if(data) {
        this.user = JSON.parse(data.toString())[0];
        this.auth.storeUserCredentials(this.user);
        this.navCtrl.navigateRoot('tabs');
      }
    });
    
  }
  gotoNextField(element, nextElement) {
    if(parseInt(element.value)) {
      nextElement.focus();
    }
  }
  
}
