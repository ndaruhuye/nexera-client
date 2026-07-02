import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./features/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./features/services/services.module').then(
            (m) => m.ServicesModule,
          ),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./features/portfolio/portfolio.module').then(
            (m) => m.PortfolioModule,
          ),
      },
      //   {
      //     path: 'blog',
      //     loadChildren: () =>
      //       import('./features/blog/blog.module').then((m) => m.BlogModule),
      //   },
      //   {
      //     path: 'careers',
      //     loadChildren: () =>
      //       import('./features/careers/careers.module').then(
      //         (m) => m.CareersModule,
      //       ),
      //   },
      {
        path: 'contact',
        loadChildren: () =>
          import('./features/contact/contact.module').then(
            (m) => m.ContactModule,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
