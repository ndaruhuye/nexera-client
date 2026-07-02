import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent,
    title: 'About',
    data: {
      seo: {
        title: 'About Nexera Group',
        description:
          'Learn about Nexera Group, a software engineering company building reliable, scalable, secure digital products for startups, businesses, and enterprises.',
        keywords:
          'About Nexera Group, software engineering company Rwanda, DevOps, system architecture, custom software development',
        image: '/images/black-name.png',
        url: '/about',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
