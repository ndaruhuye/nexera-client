import { trigger, transition, style, animate } from '@angular/animations';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ThemeService } from '../../../../core/service/theme.service';
import {
  HeroSlide,
  StatItem,
  ServiceItem,
  AudienceItem,
  ProcessStep,
  TechCategory,
} from '../../interfaces/home.interface';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':increment', [
        style({
          opacity: 0,
          transform: 'translateY(12px)',
        }),
        animate(
          '600ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ),
      ]),
      transition(':decrement', [
        style({
          opacity: 0,
          transform: 'translateY(12px)',
        }),
        animate(
          '600ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ),
      ]),
    ]),
  ],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);

  logoUrl$ = this.themeService.isDark$.pipe(
    map((isDark) =>
      isDark ? './images/white-name.png' : './images/black-name.png',
    ),
  );

  currentIndex = 0;
  private intervalId?: number;

  heros: HeroSlide[] = [
    {
      headline: 'We build reliable software for ambitious teams',
      subheadline:
        'Nexera Group helps startups, businesses, and enterprises design, build, deploy, and maintain secure digital products that scale.',
      primaryCtaText: 'Talk to an Engineer',
      primaryCtaLink: '/contact',
      secondaryCtaText: 'Explore Services',
      secondaryCtaLink: '/services',
    },
    {
      headline: 'From idea to production-ready MVP',
      subheadline:
        'We help founders validate ideas quickly, launch clean MVPs, and build a strong technical foundation for future growth.',
      primaryCtaText: 'Build Your MVP',
      primaryCtaLink: '/contact',
      secondaryCtaText: 'View Portfolio',
      secondaryCtaLink: '/portfolio',
    },
    {
      headline: 'Modernize systems without breaking operations',
      subheadline:
        'We help organizations replace legacy workflows, improve performance, automate deployment, and increase system reliability.',
      primaryCtaText: 'Modernize Your System',
      primaryCtaLink: '/contact',
      secondaryCtaText: 'See How We Work',
      secondaryCtaLink: '/services',
    },
    {
      headline: 'Your long-term engineering partner',
      subheadline:
        'Beyond delivery, we provide maintenance, DevOps, technical leadership, and continuous improvement for mission-critical systems.',
      primaryCtaText: 'Work With Us',
      primaryCtaLink: '/contact',
      secondaryCtaText: 'About Nexera',
      secondaryCtaLink: '/about',
    },
  ];

  stats: StatItem[] = [
    {
      value: '01',
      label: 'Strategy first',
    },
    {
      value: '02',
      label: 'Secure by design',
    },
    {
      value: '03',
      label: 'Built for scale',
    },
    {
      value: '04',
      label: 'Long-term support',
    },
  ];

  services: ServiceItem[] = [
    {
      icon: 'fa-solid fa-code',
      title: 'Custom Software Development',
      description:
        'Business platforms, dashboards, portals, APIs, and internal tools built around your actual workflows.',
      route: '/services',
      fragment: 'custom-software',
    },
    {
      icon: 'fa-solid fa-cloud',
      title: 'Cloud & DevOps Engineering',
      description:
        'CI/CD pipelines, cloud infrastructure, Docker deployments, monitoring, and production automation.',
      route: '/services',
      fragment: 'devops',
    },
    {
      icon: 'fa-solid fa-mobile-screen',
      title: 'Web & Mobile Applications',
      description:
        'Modern web and mobile products with clean UX, secure APIs, and scalable architecture.',
      route: '/services',
      fragment: 'mobile',
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Security & Maintenance',
      description:
        'Ongoing support, performance improvements, vulnerability fixes, backups, and technical monitoring.',
      route: '/services',
      fragment: 'maintenance',
    },
  ];

  audiences: AudienceItem[] = [
    {
      title: 'Startups',
      description:
        'Move from idea to launch with a clean MVP and a scalable technical foundation.',
      points: [
        'MVP development',
        'Product design',
        'Fast iterations',
        'Architecture guidance',
      ],
    },
    {
      title: 'Growing Businesses',
      description:
        'Digitize operations, reduce manual work, and connect your systems with reliable software.',
      points: [
        'Workflow automation',
        'Business dashboards',
        'API integrations',
        'Custom internal systems',
      ],
    },
    {
      title: 'Enterprises',
      description:
        'Modernize critical platforms with security, reliability, and long-term maintainability.',
      points: [
        'Legacy modernization',
        'High availability',
        'Security improvements',
        'Long-term support',
      ],
    },
  ];

  process: ProcessStep[] = [
    {
      step: '01',
      title: 'Discover',
      description:
        'We understand your goals, users, operations, risks, and business priorities.',
    },
    {
      step: '02',
      title: 'Design',
      description:
        'We define architecture, user flows, data models, APIs, and delivery milestones.',
    },
    {
      step: '03',
      title: 'Build',
      description:
        'We develop using clean code, reviews, testing, and production-ready engineering practices.',
    },
    {
      step: '04',
      title: 'Deploy & Support',
      description:
        'We deploy, monitor, maintain, improve, and support your product after launch.',
    },
  ];

  technologies: TechCategory[] = [
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', icon: './logos/angular.png' },
        { name: 'React', icon: './logos/react.png' },
        { name: 'Next.js', icon: './logos/next.js.png' },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'NestJS', icon: './logos/nestjs.png' },
        { name: 'Node.js', icon: './logos/nodejs.png' },
        { name: 'Java', icon: './logos/java.png' },
      ],
    },
    {
      category: 'Mobile Development',
      items: [
        { name: 'React Native', icon: './logos/react.png' },
        { name: 'Flutter', icon: './logos/flutter.png' },
        { name: 'iOS', icon: './logos/swift.png' },
      ],
    },
    {
      category: 'Database & Storage',
      items: [
        { name: 'PostgreSQL', icon: './logos/postgresql.png' },
        { name: 'MySQL', icon: './logos/mysql.png' },
        { name: 'Redis', icon: './logos/redis.png' },
      ],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        { name: 'Docker', icon: './logos/docker.png' },
        { name: 'Kubernetes', icon: './logos/kubernetes.png' },
        { name: 'AWS', icon: './logos/aws.png' },
        { name: 'GitHub Actions', icon: './logos/github.png' },
      ],
    },
    {
      category: 'AI & Machine Learning',
      items: [
        { name: 'OpenAI', icon: './logos/chatgpt.png' },
        { name: 'Python', icon: './logos/python.png' },
        { name: 'TensorFlow', icon: './logos/tensorflow.png' },
      ],
    },
    {
      category: 'Monitoring & Reliability',
      items: [
        { name: 'Prometheus', icon: './logos/prometheus.png' },
        { name: 'Grafana', icon: './logos/grafana.png' },
        { name: 'Sentry', icon: './logos/sentry.png' },
      ],
    },
    {
      category: 'Design & Collaboration',
      items: [
        { name: 'Figma', icon: './logos/figma.png' },
        { name: 'GitHub', icon: './logos/github.png' },
        { name: 'Git', icon: './logos/git.png' },
      ],
    },
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  nextSlide(): void {
    this.restartAutoSlide();
    this.currentIndex = (this.currentIndex + 1) % this.heros.length;
  }

  previousSlide(): void {
    this.restartAutoSlide();
    this.currentIndex =
      (this.currentIndex - 1 + this.heros.length) % this.heros.length;
  }

  goToSlide(index: number): void {
    this.restartAutoSlide();
    this.currentIndex = index;
  }

  private startAutoSlide(): void {
    this.intervalId = window.setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.heros.length;
    }, 6500);
  }

  private stopAutoSlide(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private restartAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  trackByTitle(index: number, item: any): string | number {
    return item?.title ?? item?.category ?? item?.label ?? index;
  }

  trackByName(index: number, item: any): string | number {
    return item?.name ?? index;
  }
}
