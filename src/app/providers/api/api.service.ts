  import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, of, Subject } from 'rxjs';
  import { ToastController } from '@ionic/angular';
  @Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    public api:string  = 'http://190.117.160.190:8086';
    public loading = false;
    //public api:string  = 'http://siga.unitek.edu.pe:8072';
    constructor(public toastController: ToastController, public http: HttpClient) {      
    }

    getDataWithParms(url, data){
      this.loading = true;
      return new Promise(resolve => {          
        this.http.get(this.api + url,  {params: {datos: JSON.stringify(data)}})
        .subscribe(
            res => {
              resolve(res);    
              this.loading = false;          
            },
            err => {
              console.log(err);
              this.loading = false; 
              this.presentToast('Algo salio mal, intentelo denuevo mas tarde.');
            }
        );
      });
    }

    postDataWithParms(url, data) {
      this.loading = true;
      // var headers = new Headers();
      // headers.append('Content-Type', 'application/x-www-form-urlencoded');        
      return new Promise(resolve => {
        const httpOptions = {
          headers: new Headers({'Content-Type': 'application/json'})
        }
        this.http.post(this.api + url, JSON.stringify(data)).subscribe(data => {
          this.loading = false;  
          console.log(data);          
        },
        err => {
          this.loading = false;    
          this.presentToast('Algo salio mal, intentelo denuevo mas tarde.');      
        });
      });
    }
    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 6000,
        color: 'dark',
        position: 'middle',
        keyboardClose: true
      });
      toast.present();
    }
  }

