import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AlertService } from '../../../../core/service/alert.service';
import {
  ContactMethod,
  SocialLink,
  ServiceOption,
  BudgetOption,
  ContactStep,
} from '../../interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-page',
  standalone: false,
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  readonly contactForm: FormGroup;

  isSubmitting = false;

  readonly hero = {
    eyebrow: 'Contact Nexera Group',
    title: 'Let’s discuss what you want to build.',
    subtitle:
      'Tell us about your product, platform, business challenge, or existing system. Our engineering team will help you define the right technical path.',
  };

  readonly contactMethods: ContactMethod[] = [
    {
      title: 'Email',
      value: 'nexeragrouprwanda@gmail.com',
      description: 'Send us your project requirements or questions.',
      href: 'mailto:nexeragrouprwanda@gmail.com',
      icon: 'fa-regular fa-envelope',
    },
    {
      title: 'Phone',
      value: '+250 788 717 923',
      description: 'Call us during normal business hours.',
      href: 'tel:+250788717923',
      icon: 'fa-solid fa-phone',
    },
    {
      title: 'WhatsApp',
      value: '+250 788 717 923',
      description: 'Start a direct conversation with our team.',
      href: 'https://wa.me/250788717923',
      icon: 'fa-brands fa-whatsapp',
    },
    {
      title: 'Location',
      value: 'Kigali, Rwanda',
      description: 'Available for projects in Rwanda and internationally.',
      href: 'https://maps.google.com/?q=Kigali,Rwanda',
      icon: 'fa-solid fa-location-dot',
    },
  ];

  readonly socialLinks: SocialLink[] = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/250788717923',
      icon: 'fa-brands fa-whatsapp',
    },
  ];

  readonly serviceOptions: ServiceOption[] = [
    {
      value: '',
      label: 'Select a service',
    },
    {
      value: 'custom-software',
      label: 'Custom Software Development',
    },
    {
      value: 'web-application',
      label: 'Web Application',
    },
    {
      value: 'mobile-application',
      label: 'Mobile Application',
    },
    {
      value: 'saas-development',
      label: 'SaaS Development',
    },
    {
      value: 'ai-automation',
      label: 'AI and Automation',
    },
    {
      value: 'devops-cloud',
      label: 'DevOps and Cloud Engineering',
    },
    {
      value: 'system-modernization',
      label: 'System Modernization',
    },
    {
      value: 'maintenance-support',
      label: 'Maintenance and Support',
    },
    {
      value: 'consultation',
      label: 'Technical Consultation',
    },
  ];

  readonly budgetOptions: BudgetOption[] = [
    {
      value: '',
      label: 'Select a budget range',
    },
    {
      value: 'under-2000',
      label: 'Under $2,000',
    },
    {
      value: '2000-5000',
      label: '$2,000 – $5,000',
    },
    {
      value: '5000-10000',
      label: '$5,000 – $10,000',
    },
    {
      value: '10000-25000',
      label: '$10,000 – $25,000',
    },
    {
      value: 'above-25000',
      label: 'Above $25,000',
    },
    {
      value: 'not-sure',
      label: 'Not sure yet',
    },
  ];

  readonly steps: ContactStep[] = [
    {
      number: '01',
      title: 'Share your idea',
      description:
        'Tell us about your goals, current challenges, required features, and expected users.',
    },
    {
      number: '02',
      title: 'Technical discussion',
      description:
        'We review your needs and discuss architecture, technology, timeline, risks, and priorities.',
    },
    {
      number: '03',
      title: 'Project proposal',
      description:
        'You receive a clear proposal covering scope, delivery phases, responsibilities, and estimated cost.',
    },
    {
      number: '04',
      title: 'Start building',
      description:
        'Once approved, we organize delivery milestones and begin designing and developing your solution.',
    },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactService: ContactService,
    private readonly alertService: AlertService,
  ) {
    this.contactForm = this.formBuilder.group({
      names: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(120)],
      ],
      phone: ['', [Validators.maxLength(30)]],
      company: ['', [Validators.maxLength(120)]],
      service: ['', [Validators.required]],
      budget: [''],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(2000),
        ],
      ],
    });
  }

  submit(): void {
    if (this.contactForm.invalid || this.isSubmitting) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValue = this.contactForm.getRawValue();

    const inquiry = {
      names: formValue.names.trim(),
      email: formValue.email.trim(),
      phone: formValue.phone?.trim() || undefined,
      company: formValue.company?.trim() || undefined,
      service: formValue.service,
      budget: formValue.budget || undefined,
      projectDetails: formValue.message.trim(),
    };

    this.isSubmitting = true;

    this.contactService
      .submitInquiry(inquiry)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
      .subscribe({
        next: (response) => {
          this.alertService.success({
            title: 'Inquiry sent',
            message:
              response.message ??
              'Thank you. Your inquiry has been sent successfully.',
          });

          this.contactForm.reset();
        },
        error: (error: unknown) => {
          this.isSubmitting = false;
          this.alertService.error({
            title: 'Unable to send inquiry',
            message: this.getErrorMessage(error),
          });
        },
      });
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const responseError = error.error;

      if (
        typeof responseError === 'object' &&
        responseError !== null &&
        'message' in responseError
      ) {
        const message = responseError.message;

        if (Array.isArray(message)) {
          return message.join(' ');
        }

        if (typeof message === 'string') {
          return message;
        }
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Your inquiry could not be sent. Please try again.';
  }

  trackByTitle(_: number, item: ContactMethod | ContactStep): string {
    return item.title;
  }

  trackByLabel(
    _: number,
    item: SocialLink | ServiceOption | BudgetOption,
  ): string {
    return item.label;
  }
}
