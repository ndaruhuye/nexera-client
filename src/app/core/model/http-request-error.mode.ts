export interface ApiRequestErrorDetails {
  status: number;
  message: string;
  messages: string[];
  url: string | null;
  code: string | null;
  timestamp: string;
}

export class ApiRequestError extends Error {
  readonly status: number;
  readonly messages: string[];
  readonly url: string | null;
  readonly code: string | null;
  readonly timestamp: string;

  constructor(details: ApiRequestErrorDetails) {
    super(details.message);

    this.name = 'ApiRequestError';
    this.status = details.status;
    this.messages = details.messages;
    this.url = details.url;
    this.code = details.code;
    this.timestamp = details.timestamp;
  }
}
