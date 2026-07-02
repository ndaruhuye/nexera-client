import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ServicesPageComponent],
  imports: [CommonModule, ServicesRoutingModule, SharedModule],
})
export class ServicesModule {}
