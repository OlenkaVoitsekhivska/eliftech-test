//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsRoutingModule } from './shops-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SharedTranslationModule } from '../shared-translation/shared-translation.module';

//COMPONENTS
import { ShopsComponent } from './shops.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [ShopsComponent, SidebarComponent],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    SharedModule,
    SharedTranslationModule,
  ],
})
export class ShopsModule {}
