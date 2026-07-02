import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesPageComponent,
    title: 'Services',
    data: {
      seo: {
        title: 'Software Engineering Services | Nexera Group',
        description:
          'Nexera Group provides custom software development, SaaS development, DevOps, cloud engineering, system modernization, AI solutions, and software maintenance.',
        keywords:
          'software development services, SaaS development, DevOps Rwanda, cloud engineering, AI software, system modernization, Nexera Group',
        image: '/images/black-name.png',
        url: '/services',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
