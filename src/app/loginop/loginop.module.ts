import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginopPageRoutingModule } from './loginop-routing.module';

import { LoginopPage } from './loginop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginopPageRoutingModule
  ],
  declarations: [LoginopPage]
})
export class LoginopPageModule {}
