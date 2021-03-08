import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ApiService } from '../providers/api/api.service';
import { AuthService } from '../providers/auth/auth.service';
import { NgxMercadopagoService } from 'ngx-mercadopago';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
 
 
//export const TargetaPago: {}="";    

@Component({
  selector: 'app-visa',
  templateUrl: './visa.page.html',
  styleUrls: ['./visa.page.scss'],
})

export class VisaPage implements OnInit {
 
  tarjeta = {
    Nombre: '',
    Numero: 0,
    ccv: 0,
    mexp: '',
    aexp:''
  };
  dataRuc: any;
  TargetaPago: any;

  constructor(public navCtrl:NavController, public alertController: AlertController,public api: ApiService, public auth: AuthService,private ngxMpService: NgxMercadopagoService, public router: Router) { 
   //Mercadopago.setPublishableKey("APP_USR-0154516a-f3e3-46a7-af72-213b46798cb3");
    //Mercadopago.getIdentificationTypes();
    //var JsonToken = "APP_USR-460356198782391-021118-1cd8d39ee643c6590cc1b9adbd64edc5-433336836";
 

  }

    
  ngOnInit() {
    this.ngxMpService.initialize();
  }

getPaymentMethods() {
    const PaymentMethods = this.ngxMpService.getPaymentMethods();
}

async createToken() {
    const cardToken = this.ngxMpService.createToken(this.TargetaPago).toPromise();
    cardToken.then(data => { 
            if (data.status == 200 || data.status == 201) {
              this.TargetaPago.token = data.data.id;
             
            this.api.getDataWithParms('/api/PagoVisa',{Pagos: this.auth.Pago  ,TargetaPago:  this.TargetaPago })
                .then(data1 => {     
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    event: JSON.stringify(data1)
                  }
                };
                this.router.navigate(['complete'], navigationExtras)
        });
      }
    });
}
// async getInstallments() {
//     const issuer = this.ngxMpService.getInstallments({
//       payment_type_id: 'XX',
//       payment_method_id: 0,
//       bin: 000000
//     }).toPromise();
// }
  guardarPago() {
    this.TargetaPago = {};
    this.TargetaPago.cardNumber = '4285810008933558';
    this.TargetaPago.securityCode = '080';
    this.TargetaPago.cardExpirationMonth ='08';
    this.TargetaPago.cardExpirationYear = '2024';
    this.TargetaPago.cardExpiration ='08/24';
    this.TargetaPago.cardholderName = 'Fiorella Del Valle Delgado';
    this. TargetaPago.docType ='DNI';
    //this.TargetaPago.docNumber ='47835271';
    this.TargetaPago.installments =1;
    this.TargetaPago.description = 'Pago 1 era cuota';
    this.TargetaPago.transactionAmount = 3  ;
    let bin = this.TargetaPago.cardNumber.substring(0, 6);     
    const paymentMethod = this.ngxMpService.getPaymentMethod({
         bin: bin 
     }).toPromise().then(data=> { 
      if (data.status == 200) {
        this.TargetaPago.paymentMethodId = data.data[0].id;
        this.TargetaPago.public_key = 'APP_USR-0154516a-f3e3-46a7-af72-213b46798cb3';
        this.TargetaPago.email = 'fiostep@gmail.com';
        this.createToken();
      }
      else{
        alert("Ocurrio un error, verifique bien los datos!!!");
      }
    });
  }  
  
  getDate() {
    var dmes = new Date(this.tarjeta.mexp),
    month = '' + (dmes.getMonth() + 1),
    daño = new Date(this.tarjeta.aexp),
    year = daño.getFullYear();
        if (month.length < 2) 
        month = '0' + month;       

    return [month, year].join('/');
  }
   
   
  getCardToken() {
    var mesd=new Date(this.tarjeta.aexp);
    var YearD=new Date(this.tarjeta.aexp);
            this.TargetaPago = {};
            this.TargetaPago.cardNumber = this.tarjeta.Numero;
            this.TargetaPago.securityCode = this.tarjeta.ccv;
            this.TargetaPago.cardExpirationMonth ='08';
            this.TargetaPago.cardExpirationYear = '24';
            this.TargetaPago.cardholderName = this.tarjeta.Nombre;
            this. TargetaPago.docType ='DNI';
            this.TargetaPago.docNumber ='47835271';
            this.TargetaPago.installments =1;
            this.TargetaPago.description = 'Pago 1 era cuota';
            this.TargetaPago.transactionAmount = 45  ;
            this.TargetaPago.paymentMethodId = 'dbvisa';
            this.TargetaPago.email = 'fiostep@gmail.com';
           // this.auth.MercadoPago2= this.TargetaPago;
           // this.prueba
            // Mercadopago.createToken(this.TargetaPago, this.prueba ).subscribe(data => { 
            //   this.TargetaPago.token = data;
            //   this.api.getDataWithParms('/api/PagoVisa',{ TargetaPago:  TargetaPago })
            //   .then(data => { 
            //    var r  = JSON.parse(data.toString()); 
                
            //   });
             
            // }) ;
          
             
  
  }
  prueba(status, response) {
    if (status == 200 || status == 201) {
     
     
        return response.id;
      
      } else {
          alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
          return "";
      }

    };  
  }
  
 
