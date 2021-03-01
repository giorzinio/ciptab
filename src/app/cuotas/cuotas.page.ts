import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.page.html',
  styleUrls: ['./cuotas.page.scss'],
})
export class CuotasPage implements OnInit {
  public importe = 0.00;
  public totalcuotas = 0;
  public form = [
    { val: 'c1', fv: '12/01/2021', isChecked: true, deuda: 20.00 },
    { val: 'c1', fv: '12/02/2021', isChecked: true, deuda: 20.00 },
    { val: 'c1', fv: '12/03/2021', isChecked: true, deuda: 20.00 },
    { val: 'c1', fv: '12/04/2021', isChecked: true, deuda: 20.00 },
    { val: 'c2', fv: '12/05/2021', isChecked: false, deuda: 20.00 },
    { val: 'c3', fv: '12/06/2021', isChecked: false, deuda: 20.00 },
    { val: 'c4', fv: '12/07/2021', isChecked: false, deuda: 20.00 },
    { val: 'c5', fv: '12/08/2021', isChecked: false, deuda: 20.00 },
    { val: 'c6', fv: '12/09/2021', isChecked: false, deuda: 20.00 },
    { val: 'c7', fv: '12/10/2021', isChecked: false, deuda: 20.00 },
    { val: 'c8', fv: '12/11/2021', isChecked: false, deuda: 20.00 },
    { val: 'c9', fv: '12/12/2021', isChecked: false, deuda: 20.00 }
  ];
  constructor(public navCtrl:NavController, private statusBar: StatusBar) { }

  checkCuotas() {
    var countCuotas = 0;
    var total = 0.00
    this.form.forEach(obj => {
      if(obj.isChecked) {
        countCuotas++;
        total = total + obj.deuda;
      }
    });
    this.importe = total;
    this.totalcuotas = countCuotas;
    //this.totalcuotas = this.form.filter((x,i) => { return x.isChecked; }).length;
  }
  
  checkMaster() {
    setTimeout(()=>{
      this.form.forEach(obj => {
        obj.isChecked = true;
      });
    });
  }

  next() {
    this.navCtrl.navigateForward(['visa']);
  }
  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

}
