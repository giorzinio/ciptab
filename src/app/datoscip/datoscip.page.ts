import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'app-datoscip',
  templateUrl: './datoscip.page.html',
  styleUrls: ['./datoscip.page.scss'],
})
export class DatoscipPage implements OnInit {
  datos = {
    vnomcap :'',
    nestcol: ''
  }
  listpais: any;
  listdep: any;
  listprov: any;
  listprovbc: any;
  listdist: any;
  listdistbc: any;
  departamento: any;
  provincia: any;
  distrito: any;
  dirección: any;

  constructor(public api: ApiService, public auth: AuthService) { 
    this.api.getDataWithParms('/api/Values',{ Opcion: 3,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.datos = JSON.parse(data.toString())[0];  
     this.datos.nestcol =  this.datos.nestcol = 1 ? 'NO HABILITADO' : 'NO HABILITADO';
     console.log(this.datos);   
    });  
  }
  ngOnInit() {
  }

}
