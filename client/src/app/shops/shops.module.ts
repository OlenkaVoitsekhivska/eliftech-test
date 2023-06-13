import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [ShopsComponent, SidebarComponent],
  imports: [CommonModule, ShopsRoutingModule, SharedModule],
})
export class ShopsModule {}
