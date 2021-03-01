import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventdetPage } from './eventdet.page';

const routes: Routes = [
  {
    path: '',
    component: EventdetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventdetPageRoutingModule {}
