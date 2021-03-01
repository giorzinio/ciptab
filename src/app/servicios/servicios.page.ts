import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import {MatStepperModule, MatStepper} from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  tipo = {
    serv: 'edit',
    datos: 'disabled',
    pagar: 'disabled'
  }
  customPickerOptions: any;
  datos: any;
  servicio: any;
  FecIni: any;
  FecFin: any;
  fechas: any = [];
  min: any;
  diffmon: any;
  isLinear = true;
  comprobante: any = 'b';
  total: any = 0;
  totalH: any = 0;
  importe: any = 0;
  firstFormGroup: FormGroup;
  document: any;
  nombre: any;
  direccionR: any;
  dataServicio: any;
  Cbancaria: any=0;
  certificado: any =0;
  Asunto: any =0;
  Entidad: any =0;
  Direccion: any =0;
  Correo: any =0;
  constructor(public navCtrl:NavController, public api: ApiService, public auth: AuthService, private _formBuilder: FormBuilder) {      
    //this.endDatos();    
    this.api.getDataWithParms('/api/Values',{ Opcion: 12,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.dataServicio = JSON.parse(data.toString())[0]; 
      
    });
    this.document = this.auth.AuthToken.ndnicol;
    this.nombre = this.auth.AuthToken.CNOMB;
    this.customPickerOptions = {
      buttons: [{
        text: 'CERRAR',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      },{
        text: 'GUARDAR',
        handler: () => this.endDatos()
      }]
    }
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
  ionViewDidEnter() {
    this.servicio = '';
    this.myStepper.reset();
  }
  
  goForward() {
    if(this.servicio=='c') {     
      this.endDatos();
    }
    this.myStepper.next();
  }
  endServ(element) {
    if(this.servicio == 'c') {
      this.api.getDataWithParms('/api/ListCuotas',{ Opcion: 13,ncodcol: this.auth.AuthToken.ncodcol, codverif: '123123', Procedure: "mobileProcedure" })
      .then(data => { 
        if(data) {
          this.datos = JSON.parse(data.toString());  
          this.FecIni= this.datos.listpago[0].FecPago;
          this.min = this.datos.listpago[0].FecPago;
          this.FecFin= this.datos.listpago[this.datos.listpago.length-1].FecPago;         
        }  
      });
    } else {
      this.api.getDataWithParms('/api/Values',{ Opcion: 14,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
      .then(data => { 
        this.certificado = JSON.parse(data.toString())[0];      
        this.importe = this.certificado.dtipcos;
        this.Cbancaria= Math.round(((this.importe+this.dataServicio.IgvI)/this.dataServicio.costanteBanco* 100)) / 100 - this.importe;
        this.total = this.importe;
        this.totalH = this.Cbancaria + this.importe;
        
      });
    }
  }
  getDatesArray(startDate, endDate) {
    var start      = startDate.split('-');
    var end        = endDate.split('-');
    var startYear  = parseInt(start[0]);
    var endYear    = parseInt(end[0]);
    var dates      = [];

    for(var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1])-1 : 0;
      for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        var month = j+1;
        var displayMonth = month < 10 ? '0'+month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;
  }
  endDatos() {    
    var dates = this.getDatesArray(this.FecIni,this.FecFin);
    this.fechas = [];
    this.importe = 0;
    for(var a=0; a< dates.length; a++) {
      if(a < this.datos.listpago.length) {
        this.fechas.push({fechaPago: this.datos.listpago[a].FecPago, Monto: this.datos.listpago[a].pago});
        this.importe = this.importe + this.datos.listpago[a].pago;
      } else {
        if(this.datos.listpago[0].dfecvit < dates[a]) {
          this.fechas.push({fechaPago: dates[a], Monto: 2.5});
          this.importe = this.importe + 2.5;
        } else {          
          this.fechas.push({fechaPago: dates[a], Monto: 20});
          this.importe = this.importe + 20;
        }        
      }
      this.Cbancaria= Math.round(((this.importe+this.dataServicio.IgvI)/this.dataServicio.costanteBanco* 100)) / 100 - this.importe;
  
      this.total = this.importe;
      this.totalH = this.Cbancaria + this.importe;
    }
    console.log(this.fechas);
    // if(this.FecFin) {
    //   this.tipo.serv = 'complete';
    //   this.tipo.datos = 'complete';
    //   this.tipo.pagar = 'edit';
    // }
  }
  tipocomp() {
    if(this.comprobante == 'f') {
      this.document = '';
      this.nombre = '';
         
    } else {
      this.document = this.auth.AuthToken.ndnicol;
      this.nombre = this.auth.AuthToken.CNOMB;
    }
  }
  getRuc() {
    if(this.document.length > 10) {
      this.api.getDataWithParms('/api/Sunat',{ Ruc: this.document })
      .then(data => { 
        if(JSON.parse(data.toString())[0]!=undefined) {
          this.nombre = JSON.parse(data.toString())[0].razon_social;
          this.direccionR=JSON.parse(data.toString())[0].domicilio_fiscal;
        }  
        else
        {
          this.nombre = JSON.parse(data.toString()).razon_social;
          this.direccionR=JSON.parse(data.toString()).domicilio_fiscal;
        }
      }); 
    }
  }
  next() {
    if(this.servicio == 'c') {
      if(this.comprobante == 'f') {
        this.auth.Pago = 
        {clidoc:this.document,clinom:this.nombre, tipdoc:'01',vserdoc:'0001',cip: this.auth.AuthToken.ncodcol,
          cipnom:this.auth.AuthToken.CNOMB,
          total:this.total,vTipoope:'01',cli:'E',
          listPago: this.fechas}
           
      } else {
        this.auth.Pago = 
        {clidoc:this.document,clinom:this.nombre, tipdoc:'03',vserdoc:'0001',cip: this.auth.AuthToken.ncodcol,
          cipnom:this.auth.AuthToken.CNOMB,
          total:this.total,vTipoope:'01',cli:'C',
          listPago: this.fechas}
      }
    } else {
      var rightNow = new Date();
      if(this.comprobante == 'f') {
        this.auth.Pago = 
        {clidoc:this.document,clinom:this.nombre, tipdoc:'01',vserdoc:'0001',cip: this.auth.AuthToken.ncodcol,
          cipnom:this.auth.AuthToken.CNOMB,
          total:this.total,vTipoope:'02',cli:'E',
          vcodcer:'0001',Asunto:this.Asunto,Entidad:this.Entidad,Direccion:this.Direccion,Correo:this.Correo,
          listPago: [{fechaPago: rightNow.toISOString(), Monto: 20}]}
           
      } else {
        this.auth.Pago = 
        {clidoc:this.document,clinom:this.nombre, tipdoc:'03',vserdoc:'0001',cip: this.auth.AuthToken.ncodcol,
          cipnom:this.auth.AuthToken.CNOMB,
          total:this.total,vTipoope:'02',cli:'C',
          vcodcer:'0001',Asunto:this.Asunto,Entidad:this.Entidad,Direccion:this.Direccion,Correo:this.Correo,
          listPago: [{fechaPago: rightNow.toISOString(), Monto: 20}]}
      }
    }
    
    
    this.navCtrl.navigateForward(['visa']);
  }
}
