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
    ncodcol :'',
    ndepnac: '',
    npronac: '',
    ndirdis: '',
    nlugnac: ''
  }
  primeracarga: any;
  listpais: any;
  listdep: any;
  listdepbc: any;
  listprov: any;
  listprovbc: any;
  listdist: any;
  listdistbc: any;
  pais: any;
  departamento: any;
  provincia: any;
  distrito: any;
  dirección: any;

  constructor(public api: ApiService, public auth: AuthService) { 
    this.api.getDataWithParms('/api/Values',{ Opcion: 2,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.datos = JSON.parse(data.toString())[0];    
     console.log(this.datos);   
     this.api.getDataWithParms('/api/Values',{ Opcion: 21,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
      .then(data => { 
        this.listpais = JSON.parse(data.toString());
        this.filterpais();
      });
      this.api.getDataWithParms('/api/Values',{ Opcion: 19,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
      .then(data => { 
        this.listdep = JSON.parse(data.toString());
        this.filterdep();
      });
      this.api.getDataWithParms('/api/Values',{ Opcion: 20,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
      .then(data => { 
        this.listprovbc = JSON.parse(data.toString());
        this.filterprov();
      });
    }); 
    this.api.getDataWithParms('/api/Values',{ Opcion: 22,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
      this.listdistbc = JSON.parse(data.toString());
      this.filterdist();
    });
  }
  filterpais() {
    //this.listdep = this.listdepbc;
    this.pais = this.listpais.filter(t=>t.ncodpai === this.datos.nlugnac)[0].ncodpai;
    console.log(this.departamento)
  }
  filterdep() {
    //this.listdep = this.listdepbc;
    this.departamento = this.listdep.filter(t=>t.ncoddep === this.datos.ndepnac)[0].ncoddep;
    console.log(this.departamento)
  }
  filterprov() {    
    this.provincia = null;
    this.distrito = null;
    this.listprov = this.listprovbc;
    this.listprov = this.listprov.filter(t=>t.ncoddep === this.departamento);
    if(!this.provincia && !this.primeracarga) {
      this.provincia = this.listprov.filter(t=>t.ncodpro === this.datos.npronac)[0].ncodpro;
    }    
    console.log(this.listprov)
  }
  filterdist() {  
    this.distrito = null;  
    this.listdist = this.listdistbc;
    this.listdist = this.listdist.filter(t=>t.ncodpro === this.provincia && t.ncoddep === this.departamento);
    if(!this.distrito && !this.primeracarga) {
      this.distrito = this.listdist.filter(t=>t.ncoddis === this.datos.ndirdis)[0].ncoddis;
    }    
    this.primeracarga = 2;
    console.log(this.listdist)
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  ngOnInit() {
  }

}
