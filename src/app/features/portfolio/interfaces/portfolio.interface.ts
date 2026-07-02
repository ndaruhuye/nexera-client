import { ProjectCategory } from '../pages/portfolio-page/portfolio-page.component';

export interface PortfolioProject {
  id: string;
  number: string;
  code: string;
  name: string;
  category: Exclude<ProjectCategory, 'All'>;
  headline: string;
  description: string;
  technologies: string[];
  link: string;
  linkLabel: string;
  featured?: boolean;
}

export interface PortfolioStat {
  value: string;
  label: string;
}

export interface DeliveryPrinciple {
  number: string;
  title: string;
  description: string;
}
