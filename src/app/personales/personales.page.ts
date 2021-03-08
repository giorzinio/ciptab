import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'app-personales',
  templateUrl: './personales.page.html',
  styleUrls: ['./personales.page.scss'],
})
export class PersonalesPage implements OnInit {
  datos = {
    ncodcol :''
  }
  constructor(public api: ApiService, public auth: AuthService) { 
    this.api.getDataWithParms('/api/Values',{ Opcion: 2,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.datos = JSON.parse(data.toString())[0];    
     console.log(this.datos);   
    });  
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  ngOnInit() {
  }

}
