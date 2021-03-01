import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides, ActionSheetController } from '@ionic/angular';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  @ViewChild('slides') slides;
  currentIndex:Number = 1;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  listevent: any;
  listevnetbp: any
  generales : any;
  capitulos : any;
  constructor(public navCtrl:NavController, private router: Router, public api: ApiService, public auth: AuthService, public actionSheetController: ActionSheetController) { 
    this.api.getDataWithParms('/api/Values',{ Opcion: 8,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
      if(data) {
        this.listevent = JSON.parse(data.toString()); 
        this.listevnetbp = this.listevent; 
      }      
    });
    this.api.getDataWithParms('/api/Values',{ Opcion: 9,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => {
      if(data) { 
        this.capitulos = JSON.parse(data.toString());   
        console.log(this.capitulos)  
      }
    });
    this.api.getDataWithParms('/api/Values',{ Opcion: 10,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
      if(data) {
        this.generales = JSON.parse(data.toString());  
      } 
    });
  }

  async filtro() {
    const filtro = await this.actionSheetController.create({
      header: 'Capitulos',
      cssClass: 'action-sheets-basic-page',
      buttons: this.createButtons()
    });
    await filtro.present();
  }

  createButtons() {
    let buttons = [];
    let button = {
      text: 'TODOS',
      icon: 'chevron-forward-outline',
      role: '',
      handler: () => {
        console.log('Favorite clicked');
      }
    }
    buttons.push(button);    
    for (let index in this.capitulos) {
      let button = {
        text: this.capitulos[index].vnomcap,
        icon: "chevron-forward-outline",
        handler: () => {
          this.filterEvent(this.capitulos[index]);
          console.log('setting icon ' + this.capitulos[index].vnomcap);
          return true;
        }
      }
      buttons.push(button);
    }
    button = {
      text: 'CERRAR',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }    
    }
    buttons.push(button);
    return buttons;
  }
  
  ngOnInit() {
    
  }
  slideNumber() {
    const index = this.slides.getActiveIndex().then(
      (index)=>{
        this.currentIndex = index + 1;
     });
  }
  detalle(obj) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        event: JSON.stringify(obj)
      }
    };
    this.router.navigate(['eventdet'], navigationExtras);
  }
  filterEvent(obj) {
    this.listevent = this.listevnetbp.filter(t=>t.vnomcap ===obj.vnomcap);
  }
  quitarfiltro(){
    this.listevent = this.listevnetbp;
  }
  doRefresh(event) {
    this.api.getDataWithParms('/api/Values',{ Opcion: 8,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.listevent = JSON.parse(data.toString());   
     console.log(this.listevent)  
     event.target.complete();
    });  
  }
}
