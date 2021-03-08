import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../providers/api/api.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AuthService } from '../providers/auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {
  clidoc:any;
  estadopago: any;
  constructor(public navCtrl:NavController,private route: ActivatedRoute, public api: ApiService,private router: Router, private file: File, private fileOpener: FileOpener,public auth: AuthService) {
    this.clidoc = this.auth.Pago.clidoc;
    this.auth.Pago=null;
    this.route.queryParams.subscribe(params => {
      if (params && params.event) {
        this.estadopago = JSON.parse(params.event);
        console.log(this.estadopago);
      }
    });
   }
  guardarvoucher() {
    this.api.getDataWithParms('/CrearDocumentos',{ rSerie:this.estadopago.vtipdoc+'-'+this.estadopago.vnumdoc,clidoc:this.clidoc })
    .then(data => { 
     //this.dataServicio = JSON.parse(data.toString())[0];       
     fetch('data:application/pdf;base64,' + data.toString(),
          {
            method: "GET"
          }).then(res => res.blob()).then(blob => {
            this.file.writeFile(this.file.externalApplicationStorageDirectory, 'statement.pdf', blob, { replace: true }).then(res => {
              this.fileOpener.open(
                res.toInternalURL(),
                'application/pdf'
              ).then((res) => {

              }).catch(err => {
                console.log('')
              });
            }).catch(err => {
                  console.log('')     
       });
          }).catch(err => {
                 console.log('')
      });
    }); 
  }
  finalizar() {        
    this.navCtrl.navigateRoot('tabs');
  }
  ngOnInit() {
  }

}
