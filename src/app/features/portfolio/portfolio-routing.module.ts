import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioPageComponent,
    title: 'Portfolio',
    data: {
      seo: {
        title: 'Our Portfolio | Nexera Group',
        description:
          'Explore software products and digital platforms built by Nexera Group, including Kubaka, Daily Digest, La Quinta Motel, Zoning Regulation, and AI MINA.',
        keywords:
          'Nexera Group portfolio, Kubaka, Daily Digest, La Quinta Motel, Zoning Regulation, AI MINA, software projects Rwanda',
        image: '/images/black-name.png',
        url: '/portfolio',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
