import {Component, AfterViewInit, ViewChild, ElementRef, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {animate, style, transition, trigger, group, query, stagger} from '@angular/animations';
import {ScrollDispatcher, CdkScrollableModule} from '@angular/cdk/scrolling';
import {map, distinctUntilChanged} from 'rxjs/operators';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ContactService} from '../../core/services/contact.service';
import {resume, skills} from '../../../utils/resumeData';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  isActive?: boolean; // For animation states
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    CdkScrollableModule
  ],
  template: `
    <div class="resume-container">
      <!-- Interactive Background -->
      <div class="resume-bg">
        <div class="resume-bg-glow"></div>
      </div>



      <!-- Main Content -->
      <div class="resume-content" cdkScrollable #scrollContainer>
        <div class="resume-header">
          <h1>Professional Experience</h1>
          <div class="experience-tags">
            <div class="tag" *ngFor="let tag of allTags"
                 [class.active]="selectedTags.includes(tag)"
                 (click)="toggleTag(tag)">
              {{ tag }}
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <section id="experience" class="resume-section">
          <div class="timeline" #timeline>
            <div class="timeline-progress" #timelineProgress></div>

            <div *ngFor="let job of filteredExperience; let i = even"
                 class="timeline-item"
                 [class.timeline-right]="i"
                 #timelineItems
                 @timelineAnimation>

              <div class="timeline-dot" [class.highlighted]="job.isActive"></div>

              <mat-card class="timeline-card"
                        [class.active]="job.isActive"
                        (mouseenter)="highlightExperience(job, true)"
                        (mouseleave)="highlightExperience(job, false)">

                <mat-card-header>
                  <div class="card-header-bg"></div>
                  <mat-card-title>{{ job.title }}</mat-card-title>
                  <mat-card-subtitle>{{ job.company }} | {{ job.period }}</mat-card-subtitle>
                </mat-card-header>

                <mat-card-content class="mt-4">
                  <p class="location">{{ job.location }}</p>
                  <p class="description">{{ job.description }}</p>

                  <div class="tech-container">
                    <span *ngFor="let tech of job.technologies"
                          class="tech-tag"
                          [class.highlighted]="selectedTags.includes(tech)">
                      {{ tech }}
                    </span>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section id="education" class="resume-section">
          <h2 class="section-title">Education</h2>

          <div class="education-cards">
            <mat-card *ngFor="let edu of education; let i = index"
                      class="education-card"
                      @fadeIn [style.animation-delay]="i * 100 + 'ms'">
              <div class="education-card-inner">
                <div class="education-icon">
                  <mat-icon>school</mat-icon>
                </div>

                <div class="education-content">
                  <h3>{{ edu.degree }}</h3>
                  <h4>{{ edu.institution }}</h4>
                  <p class="period">{{ edu.period }}</p>
                  <p class="location">{{ edu.location }}</p>
                  <p class="description">{{ edu.description }}</p>
                </div>
              </div>
            </mat-card>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="resume-section">
          <h2 class="section-title">Skills & Expertise</h2>

          <div class="skills-container">
            <div *ngFor="let category of skills; let i = index"
                 class="skill-category"
                 @skillsAnimation>
              <h3 class="category-title">{{ category.category }}</h3>

              <div class="skill-progress-container">
                <div *ngFor="let skill of category.items; let j = index" class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Download CV Button -->
        <div class="download-button">
          <button mat-raised-button color="primary" (click)="downloadCV()" class="cv-button" #downloadBtn>
            Download
            Resume
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      height: 100%;
    }

    .resume-container {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
    }

    /* Background elements */
    .resume-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
    }



    .resume-bg-glow {
      position: absolute;
      width: 40%;
      height: 40%;
      background: radial-gradient(circle, var(--color-highlight) 0%, transparent 70%);
      filter: blur(80px);
      opacity: 0.2;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      z-index: -1;
    }



    /* Main Content Area */
    .resume-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    .resume-header {
      padding-top: 2rem;
      margin-bottom: 3rem;
      text-align: center;
    }

    .resume-header h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 2rem;
      background: linear-gradient(90deg, var(--color-main), var(--color-highlight));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .experience-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
    }

    .tag {
      padding: 0.5rem 1rem;
      border-radius: 30px;
      background: var(--color-shading);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tag:hover, .tag.active {
      background: var(--color-main);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    }

    /* Resume Sections */
    .resume-section {
      margin-bottom: 6rem;
      position: relative;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 3rem;
      text-align: center;
      color: var(--color-headingText);
    }

    /* Timeline Styling */
    .timeline {
      position: relative;
      padding: 2rem 0;
    }

    .timeline-progress {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 3px;
      background: linear-gradient(to bottom, var(--color-main), var(--color-highlight));
      transform: translateX(-50%);
      z-index: 1;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 4rem;
      display: flex;
      align-items: center;
    }

    .timeline-right {
      justify-content: flex-end;
    }

    .timeline-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--color-container);
      border: 3px solid var(--color-main);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      transition: all 0.3s ease;
    }

    .timeline-dot.highlighted {
      background: var(--color-main);
      box-shadow: 0 0 0 5px rgba(var(--color-main), 0.3);
    }

    .timeline-card {
      width: 45%;
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .timeline-card.active {
      transform: scale(1.03);
      box-shadow: 0 15px 30px rgba(0,0,0,0.15);
      z-index: 10;
    }

    .card-header-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--color-main), var(--color-highlight));
    }

    .location {
      font-size: 0.9rem;
      color: var(--color-captionText);
      margin-bottom: 1rem;
    }

    .description {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .tech-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .tech-tag {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      background: var(--color-shading);
      transition: all 0.3s ease;
    }

    .tech-tag.highlighted {
      background: var(--color-main);
      color: white;
      transform: scale(1.05);
    }

    /* Education Cards */
    .education-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .education-card {
      height: 100%;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .education-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 30px rgba(0,0,0,0.1);
    }

    .education-card-inner {
      display: flex;
      height: 100%;
    }

    .education-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      padding: 1rem;
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      color: white;
    }

    .education-content {
      flex: 1;
      padding: 1.5rem;
    }

    .education-content h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .education-content h4 {
      font-size: 1.1rem;
      color: var(--color-secondary);
      margin-bottom: 1rem;
    }

    .education-content .period,
    .education-content .location {
      font-size: 0.9rem;
      color: var(--color-captionText);
      margin-bottom: 0.5rem;
    }

    /* Skills Styling */
    .skills-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem;
    }

    .skill-category {
      background: var(--color-container);
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 10px 20px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }

    .skill-category:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }

    .category-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      text-align: center;
      color: var(--color-headingText);
    }

    .skill-item {
      margin-bottom: 1.2rem;
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .skill-name {
      font-weight: 500;
    }


    /* Download Button */
    .download-button {
      display: flex;
      justify-content: center;
      margin: 4rem 0;
    }

    .cv-button {
      padding: 0.8rem 2rem;
      font-size: 1rem;
      border-radius: 30px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      color: white;
      transition: all 0.3s ease;
    }

    .cv-button:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    }


    /* Mobile styles */
    @media (max-width: 768px) {


      .timeline::before {
        left: 2rem;
      }

      .timeline-item {
        justify-content: flex-start !important;
      }

      .timeline-dot {
        left: 2rem;
      }

      .timeline-card {
        width: calc(100% - 4rem);
        margin-left: 3rem;
      }
    }
  `],
  animations: [
    trigger('timelineAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('600ms 0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('skillsAnimation', [
      transition(':enter', [
        group([
          query('.category-title', [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
          query('.skill-item', [
            style({ opacity: 0, transform: 'translateX(20px)' }),
            stagger(80, [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
            ])
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class ResumeComponent implements AfterViewInit {


  // Experience filtering
  allTags: string[] = [];
  selectedTags: string[] = [];

  // Component references
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('timelineProgress') timelineProgress!: ElementRef;
  @ViewChild('skillBars', { read: ElementRef }) skillBars!: ElementRef;
  @ViewChild('downloadBtn') downloadBtn!: ElementRef;


  private contactService = inject(ContactService);

  // Your existing data
  experience = [...resume.work].map(exp => ({ ...exp, isActive: false }));
  education = [...resume.education];
  skills = [...skills.groups];

  // Computed properties
  get filteredExperience() {
    if (this.selectedTags.length === 0) return this.experience;

    return this.experience.filter(job =>
      job.technologies.some((tech: string) => this.selectedTags.includes(tech))
    );
  }

  constructor(private scrollDispatcher: ScrollDispatcher) {
    // Extract all unique tags from experience
    this.allTags = [...new Set(
      this.experience.flatMap(job => job.technologies)
    )];
  }

  ngAfterViewInit() {
    this.initScrollObserver();
    this.initAnimations();
  }

  initScrollObserver() {
    // Watch scroll position to update active section
    this.scrollDispatcher.scrolled()
      .pipe(
        map(() => {
          const scrollTop = this.scrollContainer.nativeElement.scrollTop;
          const sections = document.querySelectorAll('.resume-section');

          let currentSection = 0;
          sections.forEach((section, index) => {
            const sectionTop = (section as HTMLElement).offsetTop;
            if (scrollTop >= sectionTop - 200) {
              currentSection = index;
            }
          });

          return currentSection;
        }),
        distinctUntilChanged(),
      )
  }

  initAnimations() {
    // Animate timeline progress based on scroll
    ScrollTrigger.create({
      trigger: this.timeline.nativeElement,
      start: 'top center',
      end: 'bottom center',
    });

    // Animate skill bars
    const skillElements = document.querySelectorAll('.skill-progress');

    skillElements.forEach(skill => {
      gsap.from(skill, {
        width: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skill,
          start: 'top bottom-=100px',
          toggleActions: 'play none none none'
        }
      });
    });
  }


  toggleTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
  }

  highlightExperience(job: Experience, isActive: boolean) {
    // Update active state for the job
    job.isActive = isActive;
  }



  downloadCV() {
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
