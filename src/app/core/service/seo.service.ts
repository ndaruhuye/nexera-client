import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';
import { SeoData } from '../model/seo.model';

type ResolvedSeoData = SeoData & {
  title: string;
  description: string;
  keywords: string;
  image: string;
  type: 'website' | 'article' | 'profile' | 'product';
  robots: string;
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
};

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly defaultSeo: ResolvedSeoData = {
    title: 'Nexera Group',
    description:
      'Nexera Group builds reliable software, modern web platforms, mobile applications, cloud systems, and long-term digital products for ambitious teams.',
    keywords:
      'Nexera Group, software engineering Rwanda, web development, mobile applications, DevOps, cloud engineering, AI solutions',
    image: '/images/black-name.png',
    type: 'website',
    robots: 'index, follow',
    twitterCard: 'summary_large_image',
  };

  private readonly siteName = 'Nexera Group';
  private readonly baseUrl = 'https://nexeragroup.rw';

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  /**
   * Call this once in app.component.ts.
   * It automatically reads SEO data from route data.
   */
  watchRouteSeo(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe(() => {
        const snapshot = this.getDeepestRouteSnapshot(
          this.activatedRoute.snapshot,
        );
        const routeSeo = snapshot.data['seo'] as SeoData | undefined;
        const routeTitle = snapshot.title;

        this.setPageSeo({
          title: routeSeo?.title || routeTitle || this.defaultSeo.title,
          ...routeSeo,
        });
      });
  }

  /**
   * Manually set SEO for any page/component.
   */
  setPageSeo(seo: SeoData): void {
    const mergedSeo = this.mergeSeo(seo);

    this.setTitle(mergedSeo.title);
    this.setBasicMetaTags(mergedSeo);
    this.setOpenGraphTags(mergedSeo);
    this.setTwitterTags(mergedSeo);
    this.setCanonicalUrl(mergedSeo.canonicalUrl || mergedSeo.url);

    if (mergedSeo.jsonLd) {
      this.setJsonLd(mergedSeo.jsonLd);
    } else {
      this.removeJsonLd();
    }
  }

  setTitle(title: string): void {
    const finalTitle = title.includes(this.siteName)
      ? title
      : `${title} | ${this.siteName}`;

    this.titleService.setTitle(finalTitle);
  }

  setCanonicalUrl(url?: string): void {
    const canonicalUrl = this.toAbsoluteUrl(url || this.router.url);

    let link = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }

  removeCanonicalUrl(): void {
    const link = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    link?.remove();
  }

  setRobots(content: string): void {
    this.metaService.updateTag({
      name: 'robots',
      content,
    });
  }

  setJsonLd(schema: Record<string, unknown>): void {
    const scriptId = 'app-json-ld';

    let script = this.document.getElementById(
      scriptId,
    ) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.text = JSON.stringify(schema);
  }

  removeJsonLd(): void {
    const script = this.document.getElementById('app-json-ld');
    script?.remove();
  }

  private setBasicMetaTags(seo: SeoData): void {
    this.metaService.updateTag({
      name: 'description',
      content: seo.description || this.defaultSeo.description,
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: seo.keywords || this.defaultSeo.keywords,
    });

    this.metaService.updateTag({
      name: 'author',
      content: seo.author || this.siteName,
    });

    this.metaService.updateTag({
      name: 'robots',
      content: seo.robots || this.defaultSeo.robots,
    });

    this.metaService.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });

    this.metaService.updateTag({
      name: 'theme-color',
      content: '#2b7fff',
    });
  }

  private setOpenGraphTags(seo: SeoData): void {
    const title = this.formatTitle(seo.title || this.defaultSeo.title);
    const description = seo.description || this.defaultSeo.description;
    const image = this.toAbsoluteUrl(seo.image || this.defaultSeo.image);
    const url = this.toAbsoluteUrl(seo.url || this.router.url);

    this.updatePropertyTag('og:title', title);
    this.updatePropertyTag('og:description', description);
    this.updatePropertyTag('og:image', image);
    this.updatePropertyTag('og:url', url);
    this.updatePropertyTag('og:type', seo.type || this.defaultSeo.type);
    this.updatePropertyTag('og:site_name', this.siteName);

    if (seo.publishedTime) {
      this.updatePropertyTag('article:published_time', seo.publishedTime);
    }

    if (seo.modifiedTime) {
      this.updatePropertyTag('article:modified_time', seo.modifiedTime);
    }
  }

  private setTwitterTags(seo: SeoData): void {
    const title = this.formatTitle(seo.title || this.defaultSeo.title);
    const description = seo.description || this.defaultSeo.description;
    const image = this.toAbsoluteUrl(seo.image || this.defaultSeo.image);

    this.metaService.updateTag({
      name: 'twitter:card',
      content: seo.twitterCard || this.defaultSeo.twitterCard,
    });

    this.metaService.updateTag({
      name: 'twitter:title',
      content: title,
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content: description,
    });

    this.metaService.updateTag({
      name: 'twitter:image',
      content: image,
    });

    if (seo.twitterSite) {
      this.metaService.updateTag({
        name: 'twitter:site',
        content: seo.twitterSite,
      });
    }

    if (seo.twitterCreator) {
      this.metaService.updateTag({
        name: 'twitter:creator',
        content: seo.twitterCreator,
      });
    }
  }

  private updatePropertyTag(property: string, content: string): void {
    this.metaService.updateTag(
      {
        property,
        content,
      },
      `property="${property}"`,
    );
  }

  private mergeSeo(seo: SeoData): ResolvedSeoData {
    return {
      ...seo,
      title: seo.title ?? this.defaultSeo.title,
      description: seo.description ?? this.defaultSeo.description,
      keywords: seo.keywords ?? this.defaultSeo.keywords,
      image: seo.image ?? this.defaultSeo.image,
      type: seo.type ?? this.defaultSeo.type,
      robots: seo.robots ?? this.defaultSeo.robots,
      twitterCard: seo.twitterCard ?? this.defaultSeo.twitterCard,
    };
  }

  private formatTitle(title: string): string {
    return title.includes(this.siteName)
      ? title
      : `${title} | ${this.siteName}`;
  }

  private toAbsoluteUrl(url?: string): string {
    if (!url) {
      return this.baseUrl;
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    if (url.startsWith('/')) {
      return `${this.baseUrl}${url}`;
    }

    return `${this.baseUrl}/${url}`;
  }

  private getDeepestRouteSnapshot(
    snapshot: ActivatedRouteSnapshot,
  ): ActivatedRouteSnapshot {
    let current = snapshot;

    while (current.firstChild) {
      current = current.firstChild;
    }

    return current;
  }
}
