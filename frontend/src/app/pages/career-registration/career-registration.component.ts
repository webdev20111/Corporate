import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';
import { FormsService } from '../../services/forms.service';
import { Page, PageService } from '../../services/page.service';

@Component({
  selector: 'app-career-registration',
  templateUrl: './career-registration.component.html',
  styleUrls: ['./career-registration.component.scss']
})
export class CareerRegistrationComponent implements OnInit, OnDestroy {
  content?: SafeHtml;
  loading = true;
  statusMessage = '';
  statusType: 'success' | 'error' = 'success';
  fieldErrors: Record<string, string[]> = {};
  resumeFile?: File;

  form = this.fb.group({
    full_name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    location: ['', [Validators.required, Validators.maxLength(120)]],
    role: ['', [Validators.required]],
    experience: ['', [Validators.required]],
    work_type: ['', [Validators.required]],
    notice_period: ['', [Validators.required]],
    portfolio_url: [''],
    about: ['', [Validators.required, Validators.maxLength(2000)]],
    agreed: [false, [Validators.requiredTrue]]
  });

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private formsService: FormsService,
    private sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.setLoadingState(true);
    this.pageService.getPage('careers-registration').subscribe({
      next: (page) => {
        try {
          this.applyMeta(page);
          const html = this.stripLayout(this.stripForms(this.fixAssetPaths(page.content_html ?? '')));
          this.content = this.sanitizer.bypassSecurityTrustHtml(html);
        } finally {
          this.setLoadingState(false);
        }
      },
      error: () => {
        this.setLoadingState(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.setLoadingState(false);
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.resumeFile = target.files[0];
    }
  }

  submit(): void {
    this.fieldErrors = {};
    this.statusMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.statusType = 'error';
      this.statusMessage = 'Please fix the highlighted fields.';
      return;
    }

    const payload = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      const normalizedValue = key === 'agreed'
        ? (value ? '1' : '0')
        : (value === null || value === undefined ? '' : String(value));
      payload.append(key, normalizedValue);
    });

    if (this.resumeFile) {
      payload.append('resume', this.resumeFile);
    }

    this.formsService.submitCareer(payload).subscribe({
      next: () => {
        this.statusType = 'success';
        this.statusMessage = 'Application submitted. We will respond within one business day.';
        this.form.reset();
        this.form.patchValue({ agreed: false });
        this.fieldErrors = {};
        this.resumeFile = undefined;
      },
      error: (error: HttpErrorResponse) => {
        this.handleSubmitError(error);
      }
    });
  }

  controlHasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  getFieldError(controlName: string): string {
    const backendError = this.fieldErrors[controlName]?.[0];
    if (backendError) {
      return backendError;
    }

    const control = this.form.get(controlName);
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required.';
    }

    if (control.errors['requiredTrue']) {
      return 'Please confirm the information provided is accurate.';
    }

    if (control.errors['email']) {
      return 'Enter a valid email address.';
    }

    if (control.errors['maxlength']) {
      return 'This value is too long.';
    }

    return 'Invalid value.';
  }

  private stripForms(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    doc.querySelectorAll('form').forEach((form) => form.remove());
    return doc.body.innerHTML;
  }

  private fixAssetPaths(html: string): string {
    return html
      .replace(/src="assets\//g, 'src="/assets/')
      .replace(/href="assets\//g, 'href="/assets/');
  }

  private applyMeta(page: Page): void {
    const title = page.meta_title || page.title || 'MPS Software Solution';
    const description = page.meta_description || '';
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    if (page.meta_keywords) {
      this.meta.updateTag({ name: 'keywords', content: page.meta_keywords });
    }
    this.meta.updateTag({ property: 'og:title', content: page.og_title || title });
    this.meta.updateTag({ property: 'og:description', content: page.og_description || description });
    if (page.og_image) {
      this.meta.updateTag({ property: 'og:image', content: page.og_image });
    }
  }

  private stripLayout(html: string): string {
    const withoutBlocks = html
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '');

    const parser = new DOMParser();
    const doc = parser.parseFromString(withoutBlocks, 'text/html');
    doc.querySelectorAll('nav, footer').forEach((node) => node.remove());
    doc.querySelectorAll('.navbar, .footer, #navMain').forEach((node) => node.remove());
    return doc.body.innerHTML;
  }

  private setLoadingState(isLoading: boolean): void {
    this.loading = isLoading;
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.toggle('page-loading', isLoading);
    }
  }

  private handleSubmitError(error: HttpErrorResponse): void {
    this.statusType = 'error';

    const apiErrors = error.error?.errors;
    if (apiErrors && typeof apiErrors === 'object') {
      this.fieldErrors = apiErrors as Record<string, string[]>;
      Object.keys(this.fieldErrors).forEach((fieldName) => {
        this.form.get(fieldName)?.markAsTouched();
      });
    }

    this.statusMessage =
      error.error?.message ||
      'Something went wrong. Please try again.';
  }
}
