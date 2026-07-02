export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
}

export interface ServiceCard {
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  cards: ServiceCard[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface EngagementModel {
  title: string;
  description: string;
  points: string[];
}
