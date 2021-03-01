import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventdetPageRoutingModule } from './eventdet-routing.module';

import { EventdetPage } from './eventdet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventdetPageRoutingModule
  ],
  declarations: [EventdetPage]
})
export class EventdetPageModule {}
