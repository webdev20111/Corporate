import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FormsService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  submitContact(payload: Record<string, unknown>) {
    return this.http.post(`${this.baseUrl}/contacts`, payload);
  }

  submitCareer(payload: FormData) {
    return this.http.post(`${this.baseUrl}/careers`, payload);
  }

  submitInternship(payload: FormData) {
    return this.http.post(`${this.baseUrl}/internships`, payload);
  }
}
