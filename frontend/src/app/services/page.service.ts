import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Page {
  id: number;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  content_html?: string;
}

@Injectable({ providedIn: 'root' })
export class PageService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPage(slug: string) {
    return this.http.get<Page>(`${this.baseUrl}/pages/${slug}`);
  }
}
