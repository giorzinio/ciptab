import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatoscipPage } from './datoscip.page';

const routes: Routes = [
  {
    path: '',
    component: DatoscipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatoscipPageRoutingModule {}
