import { Component, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../../core/services/contact.service';
import { finalize } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { gsap } from 'gsap';
import {contact} from '../../../utils/resumeData';

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
    MatSnackBarModule,
    NgOptimizedImage,
  ],
  template: `
    <div class="contact-wrapper">
      <!-- Interactive background -->
      <div class="contact-bg">
        <div class="contact-bg-shape shape1"></div>
        <div class="contact-bg-shape shape2"></div>
        <div class="contact-bg-shape shape3"></div>
      </div>

      <div class="container mx-auto py-12">
        <h1 class="text-5xl font-bold mb-12 text-center gradient-text" #contactTitle>Get In Touch</h1>

        <div class="contact-container flex flex-col md:flex-row gap-10">
          <!-- Contact Info Card -->
          <div class="contact-info-wrapper" @fadeSlideIn>
            <div class="contact-card info-card" #infoCard>
              <div class="card-header">
                <h2 class="text-2xl font-semibold mb-6">Let's Connect</h2>
                <p class="mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                  vision.
                </p>
              </div>

              <div class="contact-methods">
                <div class="contact-method" *ngFor="let method of contactMethods; let i = index"
                     #contactMethods
                     (mouseenter)="highlightMethod(i)"
                     (mouseleave)="unhighlightMethod(i)">
                  <div class="method-icon">
                    <img [ngSrc]="'/assets/svg/' + method.icon" [alt]="method.label" width="24" height="24">
                  </div>
                  <div class="method-content">
                    <h3>{{ method.label }}</h3>
                    <a [href]="method.link" class="method-value">{{ method.value }}</a>
                  </div>
                </div>
              </div>

              <div class="social-links">
                <h3 class="text-lg font-medium mb-4">Find me on</h3>
                <div class="social-icons-container">
                  <a *ngFor="let social of socialLinks"
                     [href]="social.url"
                     target="_blank"
                     class="social-icon"
                     (mouseenter)="animateSocialIcon($event)"
                     (mouseleave)="resetSocialIcon($event)">
                    <img [ngSrc]="'/assets/svg/' + social.icon" [alt]="social.key" width="24" height="24">
                  </a>
                </div>
              </div>

              <div class="cv-download">
                <button class="download-btn" (click)="downloadCV()" #downloadBtn>
                  <span class="btn-text">Download CV</span>
                  <mat-icon>file_download</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Contact Form Card -->
          <div class="contact-form-wrapper" @fadeSlideIn>
            <div class="contact-card form-card" #formCard>
              <div class="card-glow"></div>

              <h2 class="text-2xl font-semibold mb-6">Send a Message</h2>

              <form [formGroup]="contactForm" (ngSubmit)="submitForm()" class="contact-form">
                <div class="form-field-container" #formFields>
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Name</mat-label>
                    <input matInput formControlName="name" placeholder="Your name"
                           (focus)="focusField('name')" (blur)="blurField('name')">
                    <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                      Name is required
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Email</mat-label>
                    <input matInput formControlName="email" placeholder="Your email" type="email"
                           (focus)="focusField('email')" (blur)="blurField('email')">
                    <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                      Email is required
                    </mat-error>
                    <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                      Please enter a valid email address
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Subject</mat-label>
                    <input matInput formControlName="subject" placeholder="Subject"
                           (focus)="focusField('subject')" (blur)="blurField('subject')">
                    <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                      Subject is required
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Message</mat-label>
                    <textarea matInput formControlName="message" placeholder="Your message" rows="5"
                              (focus)="focusField('message')" (blur)="blurField('message')"></textarea>
                    <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                      Message is required
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="submit-container">
                  <button type="submit" class="submit-btn"
                          [disabled]="contactForm.invalid || isSubmitting"
                          #submitBtn>
                    <span class="submit-text">{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                    <div class="submit-animation" *ngIf="isSubmitting">
                      <div class="submit-loader"></div>
                    </div>
                    <mat-icon *ngIf="!isSubmitting">send</mat-icon>
                  </button>
                </div>
              </form>

              <div class="success-message" *ngIf="showSuccess" @fadeSlideIn>
                <mat-icon class="success-icon">check_circle</mat-icon>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you shortly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }

    .contact-wrapper {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    /* Background elements */
    .contact-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .contact-bg-shape {
      position: absolute;
      background: var(--color-highlight);
      opacity: 0.1;
      filter: blur(60px);
      border-radius: 50%;
    }

    .shape1 {
      width: 300px;
      height: 300px;
      top: 10%;
      left: 5%;
    }

    .shape2 {
      width: 400px;
      height: 400px;
      bottom: 10%;
      right: 5%;
      background: var(--color-main);
    }

    .shape3 {
      width: 200px;
      height: 200px;
      top: 40%;
      right: 25%;
      background: var(--color-secondary);
    }

    .gradient-text {
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .contact-container {
      position: relative;
      z-index: 1;
    }

    /* Contact Cards Styling */
    .contact-info-wrapper,
    .contact-form-wrapper {
      flex: 1;
      min-width: 300px;
    }

    .contact-card {
      background: var(--color-container);
      border-radius: 16px;
      padding: 2rem;
      height: 100%;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      position: relative;
      overflow: hidden;
      border: 1px solid var(--color-border);
      backdrop-filter: blur(10px);
    }

    /* Info Card Styling */
    .info-card {
      display: flex;
      flex-direction: column;
      background: linear-gradient(145deg, var(--color-container), var(--color-background));
    }

    .card-header {
      margin-bottom: 2rem;
    }

    .contact-methods {
      margin-bottom: 2rem;
    }

    .contact-method {
      display: flex;
      align-items: center;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .contact-method:hover {
      background: rgba(var(--color-main), 0.1);
      transform: translateX(5px);
    }

    .method-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      color: white;
    }

    .method-content {
      flex: 1;
    }

    .method-content h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
      color: var(--color-headingText);
    }

    .method-value {
      color: var(--color-bodyText);
      transition: color 0.3s ease;
    }

    .method-value:hover {
      color: var(--color-main);
    }

    /* Social Links */
    .social-links {
      margin-bottom: 2rem;
    }

    .social-icons-container {
      display: flex;
      gap: 1rem;
    }

    .social-icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--color-shading);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: var(--color-bodyText);
      position: relative;
      overflow: hidden;
    }

    .social-icon:hover {
      background: var(--color-main);
      color: white;
      transform: translateY(-5px);
    }

    /* Download Button */
    .cv-download {
      margin-top: auto;
    }

    .download-btn {
      width: 100%;
      padding: 1rem;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .download-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .download-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: all 0.6s ease;
    }

    .download-btn:hover::before {
      left: 100%;
    }

    /* Form Card Styling */
    .form-card {
      position: relative;
    }

    .card-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, var(--color-main), var(--color-highlight));
    }

    .form-field-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-field {
      width: 100%;
      transition: all 0.3s ease;
    }

    .submit-container {
      margin-top: 1.5rem;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      border-radius: 12px;
      background: var(--color-main);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .submit-btn:not(:disabled):hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .submit-animation {
      position: relative;
      width: 20px;
      height: 20px;
    }

    .submit-loader {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid rgba(255,255,255,0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Success Message */
    .success-message {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--color-container);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }

    .success-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #4CAF50;
      margin-bottom: 1.5rem;
    }

    .success-message h3 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--color-headingText);
    }

    .success-message p {
      color: var(--color-bodyText);
      font-size: 1.1rem;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .contact-container {
        flex-direction: column;
      }

      .contact-info-wrapper,
      .contact-form-wrapper {
        width: 100%;
      }
    }
  `],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(30px)' }))
      ])
    ])
  ]
})
export class ContactComponent implements AfterViewInit {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;

  // Contact information
  contactMethods = [
    { icon: 'email.svg', label: 'Email', value: 'castroalexander1995@outlook.com', link: 'mailto:castroalexander1995@outlook.com' },
    { icon: 'phone.svg', label: 'Phone', value: '+1 (123) 456-7890', link: 'tel:+11234567890' },
    { icon: 'location.svg', label: 'Location', value: 'San Francisco, CA', link: '#' }
  ];

  // Social links
  socialLinks = [...contact];

  // Element references for animations
  @ViewChild('contactTitle') contactTitle!: ElementRef;
  @ViewChild('infoCard') infoCard!: ElementRef;
  @ViewChild('formCard') formCard!: ElementRef;
  @ViewChild('formFields') formFields!: ElementRef;
  @ViewChild('submitBtn') submitBtn!: ElementRef;
  @ViewChild('downloadBtn') downloadBtn!: ElementRef;

  // Services
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private contactService = inject(ContactService);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Animate title
    gsap.fromTo(this.contactTitle.nativeElement,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Animate cards with a slight delay
    gsap.fromTo(this.infoCard.nativeElement,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    gsap.fromTo(this.formCard.nativeElement,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Animate form fields staggered
    const formFields = this.formFields.nativeElement.querySelectorAll('.form-field');
    gsap.fromTo(formFields,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.6, ease: 'power2.out' }
    );

    // Submit button animation
    gsap.fromTo(this.submitBtn.nativeElement,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 1, ease: 'power2.out' }
    );

    // Download button shimmer effect
    this.initDownloadButtonEffect();
  }

  initDownloadButtonEffect() {
    // Create shimmer effect on download button
    gsap.to(this.downloadBtn.nativeElement, {
      backgroundPosition: '200% center',
      repeat: -1,
      duration: 2,
      ease: 'linear'
    });
  }

  highlightMethod(index: number) {
    const methods = document.querySelectorAll('.contact-method');
    gsap.to(methods[index], {
      backgroundColor: 'rgba(var(--color-main-rgb), 0.1)',
      x: 5,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  unhighlightMethod(index: number) {
    const methods = document.querySelectorAll('.contact-method');
    gsap.to(methods[index], {
      backgroundColor: 'transparent',
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  animateSocialIcon(event: MouseEvent) {
    const icon = event.currentTarget as HTMLElement;
    gsap.to(icon, {
      y: -5,
      backgroundColor: 'var(--color-main)',
      color: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  resetSocialIcon(event: MouseEvent) {
    const icon = event.currentTarget as HTMLElement;
    gsap.to(icon, {
      y: 0,
      backgroundColor: 'var(--color-shading)',
      color: 'var(--color-bodyText)',
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  focusField(fieldName: string) {
    // Add focus effect for the specific field
    const field = document.querySelector(`[formControlName="${fieldName}"]`)?.closest('.form-field');
    if (field) {
      gsap.to(field, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  blurField(fieldName: string) {
    // Remove focus effect
    const field = document.querySelector(`[formControlName="${fieldName}"]`)?.closest('.form-field');
    if (field) {
      gsap.to(field, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Animation for button during submission
      gsap.to(this.submitBtn.nativeElement, {
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.out'
      });

      this.contactService.sendEmail(
        this.contactForm.value.name,
        this.contactForm.value.email,
        this.contactForm.value.message
      )
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
            gsap.to(this.submitBtn.nativeElement, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out'
            });
          })
        )
        .subscribe({
          next: () => {
            this.showSuccess = true;
            this.contactForm.reset();
            setTimeout(() => {
              this.showSuccess = false;
            }, 5000);
          },
          error: (error) => {
            console.error('Error sending email:', error);
            this.snackBar.open('Failed to send message. Please try again.', 'Close', {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
          }
        });
    }
  }

  downloadCV() {
    // Button press animation
    gsap.timeline()
      .to(this.downloadBtn.nativeElement, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.in'
      })
      .to(this.downloadBtn.nativeElement, {
        scale: 1,
        duration: 0.2,
        ease: 'elastic.out(1, 0.3)'
      });

    this.contactService.downloadCV();
  }
}
