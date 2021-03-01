import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginvfPageRoutingModule } from './loginvf-routing.module';

import { LoginvfPage } from './loginvf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginvfPageRoutingModule
  ],
  declarations: [LoginvfPage]
})
export class LoginvfPageModule {}
