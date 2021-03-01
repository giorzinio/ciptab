import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginopPage } from './loginop.page';

const routes: Routes = [
  {
    path: '',
    component: LoginopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginopPageRoutingModule {}
