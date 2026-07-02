import { Component } from '@angular/core';
import {
  PortfolioStat,
  PortfolioProject,
  DeliveryPrinciple,
} from '../../interfaces/portfolio.interface';

export type ProjectCategory =
  | 'All'
  | 'Business'
  | 'Hospitality'
  | 'Government'
  | 'Media'
  | 'Artificial Intelligence';

@Component({
  selector: 'app-portfolio-page',
  standalone: false,
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
})
export class PortfolioPageComponent {
  readonly hero = {
    eyebrow: 'Our Portfolio',
    title: 'Digital products built for real businesses and real users.',
    subtitle:
      'Explore selected platforms, websites, business systems, public information tools, and AI-powered products designed and developed by Nexera Group.',
    primaryCta: 'Start Your Project',
    primaryLink: '/contact',
    secondaryCta: 'Explore Services',
    secondaryLink: '/services',
  };

  readonly stats: PortfolioStat[] = [
    {
      value: '05',
      label: 'Selected projects',
    },
    {
      value: '05',
      label: 'Business sectors',
    },
    {
      value: 'Web',
      label: 'Modern platforms',
    },
    {
      value: 'AI',
      label: 'Intelligent products',
    },
  ];

  readonly categories: ProjectCategory[] = [
    'All',
    'Business',
    'Hospitality',
    'Government',
    'Media',
    'Artificial Intelligence',
  ];

  selectedCategory: ProjectCategory = 'All';

  readonly projects: PortfolioProject[] = [
    {
      id: 'kubaka',
      number: '01',
      code: 'KB',
      name: 'Kubaka',
      category: 'Government',
      headline: 'A modern digital platform for requesting building permit',
      description:
        'Kubaka is designed to provide a clear, reliable, and accessible digital experience while supporting the operational goals of the business.',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
      link: 'https://kubaka.gov.rw',
      linkLabel: 'Visit Kubaka',
      featured: true,
    },
    {
      id: 'daily-digest',
      number: '02',
      code: 'DIDS',
      name: 'Daily Infrastructure Digest System',
      category: 'Government',
      headline:
        'A focused platform for accessing useful information and updates on government infrastructure.',
      description:
        'Daily Digest delivers content through a simple and organized user experience designed to make important information easier to discover and consume.',
      technologies: ['Angular', 'REST API', 'Responsive Design', 'SEO'],
      link: 'https://digest.mininfra.gov.rw',
      linkLabel: 'Visit Daily Digest',
    },
    {
      id: 'la-quinta-motel',
      number: '03',
      code: 'LQ',
      name: 'La Quinta Motel',
      category: 'Hospitality',
      headline:
        'A hospitality website designed to support guests and reservations.',
      description:
        'The La Quinta Motel platform presents rooms, services, location details, and guest information through a responsive and easy-to-navigate experience.',
      technologies: ['Angular', 'Responsive UI', 'Booking Experience', 'SEO'],
      link: 'https://laquintamotel.rw',
      linkLabel: 'Visit La Quinta Motel',
    },
    {
      id: 'zoning-regulation',
      number: '04',
      code: 'ZR',
      name: 'Zoning Regulation',
      category: 'Government',
      headline: 'A digital platform for clearer access to zoning information.',
      description:
        'Zoning Regulation helps users explore planning and regulatory information through a structured, searchable, and accessible digital interface.',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Data Visualization'],
      link: 'https://zoning.lands.rw/',
      linkLabel: 'View Zoning Regulation',
    },
    {
      id: 'ai-mina',
      number: '05',
      code: 'AI',
      name: 'AI MINA',
      category: 'Artificial Intelligence',
      headline:
        'An intelligent assistant built for natural and useful interactions.',
      description:
        'AI MINA combines conversational AI, structured business knowledge, and modern software architecture to help users complete tasks and find information.',
      technologies: [
        'Artificial Intelligence',
        'OpenAI',
        'NestJS',
        'Vector Search',
      ],
      link: 'https://testing-digest.mininfra.gov.rw/mina/',
      linkLabel: 'Explore AI MINA',
      featured: true,
    },
  ];

  readonly principles: DeliveryPrinciple[] = [
    {
      number: '01',
      title: 'Business-first thinking',
      description:
        'Every project starts with the users, workflows, business goals, and operational problems the software needs to solve.',
    },
    {
      number: '02',
      title: 'Clear user experience',
      description:
        'We design interfaces that make products understandable, accessible, responsive, and easier to use.',
    },
    {
      number: '03',
      title: 'Reliable engineering',
      description:
        'We use maintainable architecture, secure APIs, structured data, testing, and production-ready deployment practices.',
    },
    {
      number: '04',
      title: 'Continuous improvement',
      description:
        'Products are monitored, maintained, refined, and expanded as user needs and business requirements grow.',
    },
  ];

  get filteredProjects(): PortfolioProject[] {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }

    return this.projects.filter(
      (project) => project.category === this.selectedCategory,
    );
  }

  selectCategory(category: ProjectCategory): void {
    this.selectedCategory = category;
  }

  trackByProject(_: number, project: PortfolioProject): string {
    return project.id;
  }

  trackByCategory(_: number, category: ProjectCategory): string {
    return category;
  }

  trackByTechnology(_: number, technology: string): string {
    return technology;
  }

  trackByTitle(
    index: number,
    item: PortfolioStat | DeliveryPrinciple,
  ): string | number {
    return 'title' in item ? item.title : (item.label ?? index);
  }
}
