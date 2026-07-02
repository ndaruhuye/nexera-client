export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;

  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'product';

  author?: string;
  publishedTime?: string;
  modifiedTime?: string;

  robots?: string;

  canonicalUrl?: string;

  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;

  jsonLd?: Record<string, unknown>;
}
