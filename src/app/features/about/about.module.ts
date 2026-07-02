import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [CommonModule, AboutRoutingModule, SharedModule],
})
export class AboutModule {}
