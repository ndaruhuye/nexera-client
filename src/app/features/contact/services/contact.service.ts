import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ContactMessage,
  ContactResponse,
} from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly endpoint = `${environment.api.baseUrl.replace(/\/$/, '')}/contact`;

  constructor(private readonly http: HttpClient) {}

  sendMessage(payload: ContactMessage): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.endpoint, payload);
  }
}
