import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.scss']
})
export class InternshipComponent implements OnInit {
  loading = false;
  submitting = false;
  statusMessage = '';
  statusType: 'success' | 'error' = 'success';
  fieldErrors: Record<string, string[]> = {};
  resumeFile?: File;

  form = this.fb.group({
    full_name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    college: ['', [Validators.required, Validators.maxLength(160)]],
    department: ['', [Validators.required, Validators.maxLength(120)]],
    year_of_study: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    message: ['', [Validators.maxLength(2000)]]
  });

  yearsOfStudy = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    'Postgraduate / Other'
  ];

  durations = [
    '1 Month',
    '2 Months',
    '3 Months',
    '6 Months'
  ];

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Best Computer Science Internship | MPS Software Solution');
    this.meta.updateTag({
      name: 'description',
      content: 'Kickstart your career with the best computer science internship program. Work on real-world projects, learn from industry experts, and build enterprise-grade software.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'computer science internship, software engineering internship, web development internship, tech internship Chennai'
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this.statusType = 'error';
        this.statusMessage = 'File size must be under 5MB.';
        target.value = '';
        return;
      }
      this.resumeFile = file;
      this.statusMessage = '';
    }
  }

  submit(): void {
    this.fieldErrors = {};
    this.statusMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.statusType = 'error';
      this.statusMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.submitting = true;
    const payload = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, String(value));
      }
    });

    if (this.resumeFile) {
      payload.append('resume', this.resumeFile);
    }

    this.formsService.submitInternship(payload).subscribe({
      next: () => {
        this.statusType = 'success';
        this.statusMessage = 'Thank you! Your internship application has been successfully submitted.';
        this.form.reset();
        this.resumeFile = undefined;
        this.submitting = false;
      },
      error: (error: HttpErrorResponse) => {
        this.submitting = false;
        this.statusType = 'error';
        const apiErrors = error.error?.errors;
        if (apiErrors && typeof apiErrors === 'object') {
          this.fieldErrors = apiErrors as Record<string, string[]>;
          Object.keys(this.fieldErrors).forEach((fieldName) => {
            this.form.get(fieldName)?.markAsTouched();
          });
        }
        this.statusMessage = error.error?.message || 'Failed to submit application. Please try again.';
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

    if (control.errors['email']) {
      return 'Enter a valid email address.';
    }

    if (control.errors['maxlength']) {
      return 'This value is too long.';
    }

    return 'Invalid value.';
  }
}
