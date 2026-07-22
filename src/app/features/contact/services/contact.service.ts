import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ContactInquiry,
  ContactInquiryResponse,
} from '../interfaces/contact.interface';
import { HttpService } from '../../../core/service/http.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends HttpService {
  private readonly endpoint = `${environment.api.url}/${environment.api.version}/inquiries`;

  submitInquiry(inquiry: ContactInquiry): Observable<ContactInquiryResponse> {
    console.log(this.endpoint);
    return this.post<ContactInquiryResponse>(this.endpoint, inquiry);
  }
}
