import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalesPage } from './personales.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalesPageRoutingModule {}
