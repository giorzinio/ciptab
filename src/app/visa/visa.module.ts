import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisaPageRoutingModule } from './visa-routing.module';

import { VisaPage } from './visa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisaPageRoutingModule
  ],
  declarations: [VisaPage]
})
export class VisaPageModule {}
