import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // ==========================
  // CONTACT
  // ==========================

  saveContact(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/contacts`,
      data
    );

  }

  // ==========================
  // CAREER
  // ==========================

  saveCareer(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/careers`,
      data
    );

  }

  // ==========================
  // INTERNSHIP
  // ==========================

  saveInternship(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/internships`,
      data
    );

  }

  // ==========================
  // FREELANCE
  // ==========================

  saveFreelance(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/projects`,
      data
    );

  }

}