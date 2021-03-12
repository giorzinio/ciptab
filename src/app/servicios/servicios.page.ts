import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import {MatStepperModule, MatStepper} from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';
import { formatDate } from "@angular/common";
import { AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Plugins, FilesystemDirectory } from '@capacitor/core';

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
  Asunto: any;
  Entidad: any;
  Direccion: any;
  Correo: any;
  financ: any;
  financiar: any;
  listdep: any;
  listprov: any;
  listprovbc: any;
  departamento: any;
  provincia: any;
  constructor(public navCtrl:NavController, public api: ApiService, public auth: AuthService, private _formBuilder: FormBuilder, public alertController: AlertController, private file: File, private fileOpener: FileOpener, private plt: Platform) {      
    //this.endDatos();    
    this.api.getDataWithParms('/api/Values',{ Opcion: 12,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.dataServicio = JSON.parse(data.toString())[0];       
    });  
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
    this.api.getDataWithParms('/api/Values',{ Opcion: 16,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
    .then(data => { 
     this.financ = JSON.parse(data.toString())[0];  
     console.log(this.financ.nfirlet);     
    });
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
    } 
    if(this.servicio == 'h') {
      if(this.financ.nestcol == 1) {
        this.api.getDataWithParms('/api/Values',{ Opcion: 14,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
        .then(data => { 
          this.certificado = JSON.parse(data.toString())[0];      
          this.importe = this.certificado.dtipcos;
          this.Cbancaria= Math.round(((this.importe+this.dataServicio.IgvI)/this.dataServicio.costanteBanco* 100)) / 100 - this.importe;
          this.total = this.importe;
          this.totalH = this.Cbancaria + this.importe;
          this.api.getDataWithParms('/api/Values',{ Opcion: 19,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
          .then(data => { 
            this.listdep = JSON.parse(data.toString());
          });
          this.api.getDataWithParms('/api/Values',{ Opcion: 20,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
          .then(data => { 
            this.listprov = JSON.parse(data.toString());
            this.listprovbc = this.listprov;
          });
        });
      } else {
        this.presentAlert('Usted no esta habilitado.');
        this.servicio='';
      }
      
    }
    if(this.servicio == 'f') {
      this.api.getDataWithParms('/api/ListCuotas',{ Opcion: 17,ncodcol: this.auth.AuthToken.ncodcol, codverif: this.auth.AuthToken.ncodcol,Procedure: "mobileProcedure" })
      .then(data => { 
        this.financiar = JSON.parse(data.toString());    
        this.fechas = [];
        this.importe = 0;
        for(var a=0; a<this.financiar.listpago.length; a++) {
          this.fechas.push({fechaPago: this.financiar.listpago[a].FecPago, Monto: this.financiar.listpago[a].pago});
          this.importe = this.importe + this.financiar.listpago[a].pago;
        }
        this.Cbancaria= Math.round(((this.importe+this.dataServicio.IgvI)/this.dataServicio.costanteBanco* 100)) / 100 - this.importe;
        this.total = this.importe;
        this.totalH = this.Cbancaria + this.importe;
        
      });
    }
  }
  filterProv() {
    this.provincia = null;
    this.listprov = this.listprovbc;
    this.listprov = this.listprov.filter(t=>t.ncoddep === this.departamento);
    console.log(this.listprov)
  }
  async presentAlert(text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje de Alerta',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
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
  endDatosFinan() {
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
          this.presentAlert('Los servicios de la sunat estan temporalmente inestables, intentelo mas tarde.')
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
    } 
    if(this.servicio == 'h') {
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
    if(this.servicio == 'f') {
      var rightNow = new Date();
      if(this.comprobante == 'f') {
        this.auth.Pago = 
        {clidoc:this.document,clinom:this.nombre, tipdoc:'01',vserdoc:'0001',cip: this.auth.AuthToken.ncodcol,
          cipnom:this.auth.AuthToken.CNOMB,TipoPagoE:'E',
          total:this.total,vTipoope:'02',cli:'E',
          vcodcer:'0001',Asunto:this.Asunto,Entidad:this.Entidad,Direccion:this.Direccion,Correo:this.Correo,
          listPago: this.fechas}
           
      } else {
        this.auth.Pago = 
        {clidoc:this.document,clinom:this.nombre, tipdoc:'03',vserdoc:'0001',cip: this.auth.AuthToken.ncodcol,
          cipnom:this.auth.AuthToken.CNOMB,TipoPagoE:'E',
          total:this.total,vTipoope:'02',cli:'C',
          vcodcer:'0001',Asunto:this.Asunto,Entidad:this.Entidad,Direccion:this.Direccion,Correo:this.Correo,
          listPago: this.fechas}
      }
    }
    
    this.navCtrl.navigateForward(['visa']);
  }
}
