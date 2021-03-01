import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginvfPage } from './loginvf.page';

const routes: Routes = [
  {
    path: '',
    component: LoginvfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginvfPageRoutingModule {}
