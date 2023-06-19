import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessfulOrderComponent } from '../shared/successful-order/successful-order.component';
import { CompositeOrderFormComponent } from './components/composite-order-form/composite-order-form.component';

const routes: Routes = [
  { path: '', component: CompositeOrderFormComponent },
  { path: 'success', component: SuccessfulOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
