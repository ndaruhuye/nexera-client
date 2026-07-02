import { Component } from '@angular/core';

import {
  NavigationLogo,
  NavigationRoute,
} from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  logo: NavigationLogo = {
    type: 'text',
    text: 'Nexera Group',
  };

  routes: NavigationRoute[] = [
    {
      label: 'Home',
      route: '/',
      icon: 'fa-solid fa-house',
      exact: true,
    },
    {
      label: 'About',
      route: '/about',
      icon: 'fa-solid fa-circle-info',
    },
    {
      label: 'Services',
      route: '/services',
      icon: 'fa-solid fa-layer-group',
      // children: [
      //   {
      //     label: 'Web Development',
      //     route: '/services/web-development',
      //     icon: 'fa-solid fa-code',
      //   },
      //   {
      //     label: 'Mobile Apps',
      //     route: '/services/mobile-apps',
      //     icon: 'fa-solid fa-mobile-screen',
      //   },
      //   {
      //     label: 'Cloud Solutions',
      //     route: '/services/cloud-solutions',
      //     icon: 'fa-solid fa-cloud',
      //   },
      //   {
      //     label: 'DevOps',
      //     route: '/services/devops',
      //     icon: 'fa-solid fa-server',
      //   },
      // ],
    },
    {
      label: 'Portfolio',
      route: '/portfolio',
      icon: 'fa-solid fa-briefcase',
    },
    // {
    //   label: 'Blog',
    //   route: '/blog',
    //   icon: 'fa-solid fa-newspaper',
    // },
    // {
    //   label: 'Careers',
    //   route: '/careers',
    //   icon: 'fa-solid fa-user-tie',
    //   badge: 'Hiring',
    // },
    {
      label: 'Contact',
      route: '/contact',
      icon: 'fa-solid fa-envelope',
    },
  ];
}
