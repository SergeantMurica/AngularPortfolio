import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Contact Me</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="contact-info">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Get In Touch</mat-card-title>
            </mat-card-header>

            <mat-card-content class="mt-4">
              <p class="mb-6">
                I'm always open to discussing new projects, creative ideas or opportunities to
                be part of your vision.
              </p>

              <div class="contact-method flex items-center mb-4">
                <mat-icon color="primary" class="mr-3">email</mat-icon>
                <a href="mailto:alex@example.com" class="text-primary">alex&#64;example.com</a>
              </div>

              <div class="contact-method flex items-center mb-4">
                <mat-icon color="primary" class="mr-3">phone</mat-icon>
                <a href="tel:+11234567890" class="text-primary">+1 (123) 456-7890</a>
              </div>

              <div class="contact-method flex items-center mb-4">
                <mat-icon color="primary" class="mr-3">location_on</mat-icon>
                <span>San Francisco, CA</span>
              </div>

              <div class="social-links flex gap-4 mt-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                   mat-icon-button color="primary">
                  <mat-icon>code</mat-icon>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   mat-icon-button color="primary">
                  <mat-icon>business</mat-icon>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   mat-icon-button color="primary">
                  <mat-icon>chat</mat-icon>
                </a>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="contact-form">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Send Me a Message</mat-card-title>
            </mat-card-header>

            <mat-card-content class="mt-4">
              <form [formGroup]="contactForm" (ngSubmit)="submitForm()" class="flex flex-col">
                <mat-form-field appearance="outline" class="mb-4">
                  <mat-label>Name</mat-label>
                  <input matInput formControlName="name" placeholder="Your name">
                  <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                    Name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="mb-4">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" placeholder="Your email" type="email">
                  <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                    Please enter a valid email address
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="mb-4">
                  <mat-label>Subject</mat-label>
                  <input matInput formControlName="subject" placeholder="Subject">
                  <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                    Subject is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="mb-4">
                  <mat-label>Message</mat-label>
                  <textarea matInput formControlName="message" placeholder="Your message" rows="5"></textarea>
                  <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                    Message is required
                  </mat-error>
                </mat-form-field>

                <button type="submit" mat-raised-button color="primary"
                        [disabled]="contactForm.invalid || isSubmitting">
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // In a real application, you would send the form data to a backend service
      // For demo purposes, we'll just simulate a delay and show a success message
      setTimeout(() => {
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });

        this.contactForm.reset();
        this.isSubmitting = false;
      }, 1500);
    }
  }
}
