import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ThemeService } from '../../../core/service/theme.service';

interface FooterRoute {
  label: string;
  route: string;
}

interface FooterSocial {
  label: string;
  icon: string;
  link: string;
}

interface FooterContact {
  name: string;
  label: string;
  icon: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  logoUrl$: Observable<string>;

  routes: FooterRoute[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
    { label: 'Portfolio', route: '/portfolio' },
    // { label: 'Blog', route: '/blog' },
    { label: 'Contact', route: '/contact' },
  ];

  socials: FooterSocial[] = [
    {
      label: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      link: 'https://wa.me/250788717923',
    },
  ];

  contacts: FooterContact[] = [
    {
      name: 'Email',
      label: 'nexeragrouprwanda@gmail.com',
      icon: 'fa-regular fa-envelope',
      href: 'mailto:nexeragrouprwanda@gmail.com',
    },
    {
      name: 'Phone',
      label: '+250 788 717 923',
      icon: 'fa-solid fa-phone',
      href: 'tel:+250788717923',
    },
  ];

  constructor(private readonly themeService: ThemeService) {
    this.logoUrl$ = this.themeService.isDark$.pipe(
      map((isDark) =>
        isDark ? './images/white-logo.png' : './images/black-logo.png',
      ),
    );
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  trackByLabel(
    _: number,
    item: FooterRoute | FooterSocial | FooterContact,
  ): string {
    return item.label;
  }
}
