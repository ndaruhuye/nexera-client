import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
  declarations: [
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
  ],
})
export class LayoutModule {}
