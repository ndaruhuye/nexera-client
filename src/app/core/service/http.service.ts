import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { ApiRequestError } from '../model/http-request-error.mode';
import {
  HttpRequestOptions,
  HttpQueryParameters,
  HttpParameterValue,
} from '../model/http-request-option.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly httpClient = inject(HttpClient);

  private readonly defaultTimeoutMs = 30_000;

  /**
   * Sends an HTTP GET request.
   */
  protected get<TResponse>(
    url: string,
    options: HttpRequestOptions = {},
  ): Observable<TResponse> {
    return this.request<TResponse>('GET', url, undefined, options);
  }

  /**
   * Sends an HTTP POST request.
   */
  protected post<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    options: HttpRequestOptions = {},
  ): Observable<TResponse> {
    return this.request<TResponse>('POST', url, body, options);
  }

  /**
   * Sends an HTTP PUT request.
   */
  protected put<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    options: HttpRequestOptions = {},
  ): Observable<TResponse> {
    return this.request<TResponse>('PUT', url, body, options);
  }

  /**
   * Sends an HTTP PATCH request.
   */
  protected patch<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    options: HttpRequestOptions = {},
  ): Observable<TResponse> {
    return this.request<TResponse>('PATCH', url, body, options);
  }

  /**
   * Sends an HTTP DELETE request.
   */
  protected delete<TResponse>(
    url: string,
    options: HttpRequestOptions = {},
  ): Observable<TResponse> {
    return this.request<TResponse>('DELETE', url, undefined, options);
  }

  /**
   * Sends an HTTP DELETE request with a request body.
   */
  protected deleteWithBody<TResponse, TBody>(
    url: string,
    body: TBody,
    options: HttpRequestOptions = {},
  ): Observable<TResponse> {
    return this.request<TResponse>('DELETE', url, body, options);
  }

  /**
   * Sends a file upload request using FormData.
   *
   * Do not manually set Content-Type for FormData.
   * The browser must add the multipart boundary.
   */
  protected upload<TResponse>(
    url: string,
    formData: FormData,
    options: HttpRequestOptions = {},
  ): Observable<TResponse> {
    return this.request<TResponse>('POST', url, formData, options);
  }

  /**
   * Downloads a file as a Blob.
   */
  protected download(
    url: string,
    options: HttpRequestOptions = {},
  ): Observable<Blob> {
    return this.httpClient
      .get(url, {
        headers: this.createHeaders(options.headers),
        params: this.createParams(options.params),
        context: options.context,
        withCredentials: options.withCredentials,
        responseType: 'blob',
      })
      .pipe(
        timeout(options.timeoutMs ?? this.defaultTimeoutMs),
        catchError((error: unknown) => this.handleError(error, url)),
      );
  }

  /**
   * Sends a generic JSON HTTP request.
   */
  private request<TResponse>(
    method: string,
    url: string,
    body: unknown,
    options: HttpRequestOptions,
  ): Observable<TResponse> {
    return this.httpClient
      .request<TResponse>(method, url, {
        body,
        headers: this.createHeaders(options.headers),
        params: this.createParams(options.params),
        context: options.context,
        withCredentials: options.withCredentials,
        responseType: 'json',
      })
      .pipe(
        timeout(options.timeoutMs ?? this.defaultTimeoutMs),
        catchError((error: unknown) => this.handleError(error, url)),
      );
  }

  /**
   * Creates immutable Angular HTTP headers.
   */
  private createHeaders(
    headers?: HttpHeaders | Record<string, string | readonly string[]>,
  ): HttpHeaders {
    if (headers instanceof HttpHeaders) {
      return headers;
    }

    let httpHeaders = new HttpHeaders({
      Accept: 'application/json',
    });

    if (!headers) {
      return httpHeaders;
    }

    for (const [name, value] of Object.entries(headers)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          httpHeaders = httpHeaders.append(name, item);
        }

        continue;
      }

      httpHeaders = httpHeaders.set(name, value as string);
    }

    return httpHeaders;
  }

  /**
   * Converts a plain object into Angular HttpParams.
   */
  private createParams(params?: HttpQueryParameters): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    for (const [name, value] of Object.entries(params)) {
      if (value === null || value === undefined) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          httpParams = httpParams.append(name, this.serializeParameter(item));
        }

        continue;
      }

      httpParams = httpParams.set(
        name,
        this.serializeParameter(value as HttpParameterValue),
      );
    }

    return httpParams;
  }

  private serializeParameter(value: HttpParameterValue): string {
    if (value instanceof Date) {
      return value.toISOString();
    }

    return String(value);
  }

  /**
   * Converts all network and backend errors to one format.
   */
  private handleError(error: unknown, requestUrl: string): Observable<never> {
    if (error instanceof ApiRequestError) {
      return throwError(() => error);
    }

    if (error instanceof TimeoutError) {
      return throwError(
        () =>
          new ApiRequestError({
            status: 0,
            message: 'The request took too long. Please try again.',
            messages: ['The request took too long. Please try again.'],
            url: requestUrl,
            code: 'REQUEST_TIMEOUT',
            timestamp: new Date().toISOString(),
          }),
      );
    }

    if (error instanceof HttpErrorResponse) {
      const messages = this.extractMessages(error);

      return throwError(
        () =>
          new ApiRequestError({
            status: error.status,
            message: messages[0] ?? 'The request failed.',
            messages,
            url: error.url ?? requestUrl,
            code: this.extractErrorCode(error.error),
            timestamp: new Date().toISOString(),
          }),
      );
    }

    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.';

    return throwError(
      () =>
        new ApiRequestError({
          status: 0,
          message,
          messages: [message],
          url: requestUrl,
          code: 'UNKNOWN_ERROR',
          timestamp: new Date().toISOString(),
        }),
    );
  }

  private extractMessages(error: HttpErrorResponse): string[] {
    if (error.status === 0) {
      return [
        'Unable to connect to the server. Check your internet connection and try again.',
      ];
    }

    const response = error.error;

    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const message = response.message;

      if (Array.isArray(message)) {
        return message.filter(
          (item): item is string => typeof item === 'string',
        );
      }

      if (typeof message === 'string') {
        return [message];
      }
    }

    if (typeof response === 'string') {
      return [response];
    }

    if (error.message) {
      return [error.message];
    }

    return [this.defaultStatusMessage(error.status)];
  }

  private extractErrorCode(response: unknown): string | null {
    if (
      typeof response === 'object' &&
      response !== null &&
      'code' in response &&
      typeof response.code === 'string'
    ) {
      return response.code;
    }

    return null;
  }

  private defaultStatusMessage(status: number): string {
    switch (status) {
      case 400:
        return 'The submitted information is invalid.';

      case 401:
        return 'You are not authorized to perform this action.';

      case 403:
        return 'You do not have permission to perform this action.';

      case 404:
        return 'The requested resource was not found.';

      case 409:
        return 'The request conflicts with existing information.';

      case 422:
        return 'The submitted information could not be processed.';

      case 429:
        return 'Too many requests. Please try again later.';

      case 500:
        return 'The server encountered an error. Please try again later.';

      case 502:
      case 503:
      case 504:
        return 'The service is temporarily unavailable. Please try again later.';

      default:
        return 'The request failed. Please try again.';
    }
  }
}
