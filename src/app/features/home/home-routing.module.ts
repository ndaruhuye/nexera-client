import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home',
    data: {
      seo: {
        title: 'Nexera Group',
        description:
          'Nexera Group builds reliable, scalable, and secure software solutions for startups, businesses, and enterprises.',
        keywords:
          'Nexera Group, software development Rwanda, Angular, NestJS, DevOps, cloud engineering, system architecture',
        image: '/images/black-name.png',
        url: '/',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
