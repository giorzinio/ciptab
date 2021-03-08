import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.page.html',
  styleUrls: ['./trabajo.page.scss'],
})
export class TrabajoPage implements OnInit {
  datos = {
    ncodcol :''
  }
  constructor(public api: ApiService, public auth: AuthService) { 
    this.api.getDataWithParms('/api/Values',{ Opcion: 5,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.datos = JSON.parse(data.toString())[0];    
     console.log(this.datos);   
    });  
  }

  ngOnInit() {
  }

}
