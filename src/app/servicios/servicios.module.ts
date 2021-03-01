import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';
import {MatStepperModule} from '@angular/material/stepper';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule,
    MatStepperModule,
    ReactiveFormsModule 
  ],
  declarations: [ServiciosPage]
})
export class ServiciosPageModule {}
