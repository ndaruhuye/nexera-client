import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent,
    title: 'Contact',
    data: {
      seo: {
        title: 'Contact Nexera Group',
        description:
          'Contact Nexera Group to discuss custom software development, mobile applications, cloud engineering, DevOps, AI solutions, and system modernization.',
        keywords:
          'contact Nexera Group, software company Rwanda, software development consultation, hire software engineers Rwanda',
        image: '/images/black-name.png',
        url: '/contact',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
