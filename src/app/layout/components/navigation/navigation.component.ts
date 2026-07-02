import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/service/theme.service';

export type NavigationLogoType = 'image' | 'icon' | 'text';

export interface NavigationLogo {
  type: NavigationLogoType;
  src?: string;
  alt?: string;
  icon?: string;
  text?: string;
}

export interface NavigationRoute {
  label: string;
  route?: string | string[];
  icon?: string;
  badge?: string | number;
  visible?: boolean;
  exact?: boolean;
  children?: NavigationRoute[];
}

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @Input() showLogo = true;

  @Input() logo: NavigationLogo = {
    type: 'text',
    text: 'Nexera Group',
  };

  @Input() routes: NavigationRoute[] = [
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

  readonly isDark$;

  isMobileMenuOpen = false;
  openedSubmenuLabel: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly themeService: ThemeService,
  ) {
    this.isDark$ = this.themeService.isDark$;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
    this.closeMobileMenu();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (!this.isMobileMenuOpen) {
      this.openedSubmenuLabel = null;
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.openedSubmenuLabel = null;
  }

  toggleSubmenu(item: NavigationRoute): void {
    if (!item.children?.length) {
      return;
    }

    this.openedSubmenuLabel =
      this.openedSubmenuLabel === item.label ? null : item.label;
  }

  isSubmenuOpen(item: NavigationRoute): boolean {
    return this.openedSubmenuLabel === item.label;
  }

  isVisible(item: NavigationRoute): boolean {
    return item.visible !== false;
  }

  trackByLabel(_: number, item: NavigationRoute): string {
    return item.label;
  }
}
