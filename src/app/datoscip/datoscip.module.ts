import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatoscipPageRoutingModule } from './datoscip-routing.module';

import { DatoscipPage } from './datoscip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatoscipPageRoutingModule
  ],
  declarations: [DatoscipPage]
})
export class DatoscipPageModule {}
