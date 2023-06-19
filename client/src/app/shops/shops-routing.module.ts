import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsComponent } from './shops.component';

const routes: Routes = [
  {
    path: '',
    component: ShopsComponent,
  },

  {
    path: ':id', //:type is dynamic here
    component: ShopsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsRoutingModule {}
