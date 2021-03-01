import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalesPageRoutingModule } from './personales-routing.module';

import { PersonalesPage } from './personales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalesPageRoutingModule
  ],
  declarations: [PersonalesPage]
})
export class PersonalesPageModule {}
