import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  cuotas: any;
  // public cuotas = [
  //   { val: 'c1', fv: 'Dic, 2020', fp: 'F.pago Dic 20, 2020', deuda: 20.00 },
  //   { val: 'c1', fv: 'Nov, 2020', fp: 'F.pago Dic 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Oct, 2020', fp: 'F.pago Dic 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Sep, 2020', fp: 'F.pago Oct 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Ago, 2020', fp: 'F.pago Oct 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Jul, 2020', fp: 'F.pago Ago 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Jun, 2020', fp: 'F.pago Ago 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'May, 2020', fp: 'F.pago Ago 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Abr, 2020', fp: 'F.pago Ago 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Mar, 2020', fp: 'F.pago Ene 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Feb, 2020', fp: 'F.pago Ene 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Ene, 2020', fp: 'F.pago Ene 20, 2020', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Dic, 2019', fp: 'F.pago Sep 20, 2019', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Nov, 2019', fp: 'F.pago Sep 20, 2019', deuda: 20.00 }, 
  //   { val: 'c1', fv: 'Oct, 2019', fp: 'F.pago Sep 20, 2019', deuda: 20.00 },     
  // ];
  constructor(public api: ApiService, public auth: AuthService) { 
    
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.api.getDataWithParms('/api/Values',{ Opcion: 1,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
       if(data) {
         this.cuotas = JSON.parse(data.toString());
       }
       event.target.complete();
    });    
  }
  ngOnInit() {
    this.api.getDataWithParms('/api/Values',{ Opcion: 1,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
       if(data) {
         this.cuotas = JSON.parse(data.toString());
       }
    });
  }
}
