export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ContactMethod {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface ServiceOption {
  value: string;
  label: string;
}

export interface BudgetOption {
  value: string;
  label: string;
}

export interface ContactStep {
  number: string;
  title: string;
  description: string;
}
