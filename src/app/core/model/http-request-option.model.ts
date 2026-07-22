import { HttpContext, HttpHeaders } from '@angular/common/http';

export type HttpParameterValue = string | number | boolean | Date;

export type HttpQueryParameters = Record<
  string,
  HttpParameterValue | readonly HttpParameterValue[] | null | undefined
>;

export interface HttpRequestOptions {
  /**
   * Additional request headers.
   */
  headers?: HttpHeaders | Record<string, string | readonly string[]>;

  /**
   * Query parameters appended to the URL.
   */
  params?: HttpQueryParameters;

  /**
   * Angular request context used by interceptors.
   */
  context?: HttpContext;

  /**
   * Include browser credentials such as cookies.
   */
  withCredentials?: boolean;

  /**
   * Request timeout in milliseconds.
   */
  timeoutMs?: number;
}
