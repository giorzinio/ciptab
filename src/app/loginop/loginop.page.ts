import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginop',
  templateUrl: './loginop.page.html',
  styleUrls: ['./loginop.page.scss'],
})
export class LoginopPage implements OnInit {
  isShown: boolean = false ;
  message: any;
  disButton: boolean = false;
  codigo: number;
  user: any;
  constructor(public navCtrl:NavController, public api: ApiService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  validarCip() {
    this.api.getDataWithParms('/api/Values',{ Opcion: 0,ncodcol: this.codigo, codverif: '123456', Procedure: "mobileProcedure" })
    .then(data => { 
      if(data) {
        this.user = JSON.parse(data.toString())[0];  
        if(this.user.vcorcol) {
          this.message = 'CIP verificado, se enviará su codigo al suiguiente correo ' + this.user.vcorcol;
          this.disButton = true;
        } else {
          this.message = 'Póngase en contacto al Colegio de Ingenieros del Perú para actualizar sus datos';
        }
      } else {
        this.message = 'Error, no existe el Código CIP ingresado';
      }       
      this.isShown = true;  
    });      
  }
  sendCode() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user)
      }
    };
    this.api.getDataWithParms('/api/Envios',{ ncodcol: this.user.ncodcol, vcorcol: this.user.vcorcol })
    .then(data => {         
      this.router.navigate(['loginvf'], navigationExtras);
    });        
  }
}
