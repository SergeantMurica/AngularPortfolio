import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {animate, style, transition, trigger, group, query, stagger} from '@angular/animations';
import {ScrollDispatcher, CdkScrollableModule} from '@angular/cdk/scrolling';
import {map, filter, distinctUntilChanged} from 'rxjs/operators';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

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
        <div class="resume-bg-grid"></div>
        <div class="resume-bg-glow"></div>
      </div>

      <!-- Floating Navigation Pills -->
      <div class="resume-nav">
        <button
          *ngFor="let section of sections; let i = index"
          class="resume-nav-pill"
          [class.active]="activeSection === i"
          (click)="scrollToSection(i)">
          {{section}}
        </button>
      </div>

      <!-- Main Content -->
      <div class="resume-content" cdkScrollable #scrollContainer>
        <div class="resume-header">
          <h1>Professional Experience</h1>
          <div class="experience-tags">
            <div class="tag" *ngFor="let tag of allTags"
                 [class.active]="selectedTags.includes(tag)"
                 (click)="toggleTag(tag)">
              {{tag}}
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
                    <span class="skill-level"
                          [attr.data-level]="getSkillLevel(skill)">
                      {{ getSkillLevel(skill) }}/10
                    </span>
                  </div>

                  <div class="skill-bar">
                    <div class="skill-progress"
                         [style.width.%]="getSkillLevel(skill) * 10"
                         #skillBars></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Download CV Button -->
        <div class="download-button">
          <button mat-raised-button color="primary" class="cv-button">
            <mat-icon>download</mat-icon> Download Full Resume
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

    .resume-bg-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(var(--color-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.1;
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

    /* Navigation Pills */
    .resume-nav {
      position: fixed;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      z-index: 100;
    }

    .resume-nav-pill {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color-border);
      border: none;
      cursor: pointer;
      padding: 0;
      position: relative;
      transition: all 0.3s ease;
    }

    .resume-nav-pill:hover, .resume-nav-pill.active {
      background: var(--color-main);
      transform: scale(1.5);
    }

    .resume-nav-pill:hover::after {
      content: attr(data-section);
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      white-space: nowrap;
      font-size: 0.75rem;
      opacity: 1;
    }

    .resume-nav-pill::after {
      content: attr(data-section);
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      color: var(--color-headingText);
      white-space: nowrap;
      font-size: 0.75rem;
      opacity: 0;
      transition: opacity 0.3s ease;
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

    .skill-level {
      font-size: 0.8rem;
      color: var(--color-captionText);
    }

    .skill-bar {
      height: 8px;
      background: var(--color-shading);
      border-radius: 4px;
      overflow: hidden;
    }

    .skill-progress {
      height: 100%;
      background: linear-gradient(90deg, var(--color-main), var(--color-highlight));
      border-radius: 4px;
      width: 0; /* Will be animated */
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
      .resume-nav {
        display: none;
      }

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
  // Section names for navigation
  sections = ['Experience', 'Education', 'Skills'];
  activeSection = 0;

  // Experience filtering
  allTags: string[] = [];
  selectedTags: string[] = [];

  // Component references
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('timelineProgress') timelineProgress!: ElementRef;
  @ViewChild('skillBars', { read: ElementRef }) skillBars!: ElementRef;

  // Your existing data
  experience = [
    {
      title: 'Freelance Developer',
      company: 'Self-Employed',
      period: '2024 - Present',
      location: 'Phoenix, AZ',
      description: 'Aided companies in building scalable and efficient web applications. Range of projects from personal websites to a complex nonprofit platforms.',
      technologies: ['React', 'TypeScript', 'Material UI', 'Jest']
    },
    {
      title: 'The Pantheon Dev',
      company: 'Self-Employed',
      period: '2025 - Present',
      location: 'Phoenix, AZ',
      description: 'Currently developing a new UI library for React based projects, called Maia UI, and a productivity application called ChronosBoard.',
      technologies: ['React', 'TypeScript', 'SCSS', 'PostCSS', 'Tailwind CSS', 'Jest', 'Storybook', 'UI Testing', 'UI/UX Design']
    },
    {
      title: 'Content Creator',
      company: 'Self-Employed',
      period: '04/2021 - 12/2024',
      location: 'Phoenix, AZ',
      description: 'Produce content focused on mental health awareness and suicide prevention through gaming and entertainment.',
      technologies: ['DaVinci Resolve', 'TikTok', 'YouTube', 'Instagram']
    },
    {
      title: 'Sales Professional',
      company: 'Bell Honda',
      period: '10/2023 - 11/2023',
      location: 'Phoenix, AZ',
      description: 'Engaged with clients to identify needs and deliver desired vehicle.',
      technologies: ['Salesforce', 'CRM', 'Customer Service']
    },
    {
      title: 'Director of Development',
      company: 'Veterans Gaming & Mental Health Mission',
      period: '01/2023 - 05/2023',
      location: 'Online',
      description: 'Led development initiatives to secure funding and build partnerships for the organization. While also designing and implemented strategic plans to enhance organizational growth.',
      technologies: ['Project Management', 'Fundraising', 'Partnership Building']
    },
    {
      title: 'Volunteer Director of Marketing',
      company: 'Veterans Gaming & Mental Health Mission',
      period: '05/2022 - 01/2023',
      location: 'Online',
      description: 'Managed SEO strategies, advertising campaigns, and the social media presence of the organization. Also redesigned the organization\'s website to improve functionality and engagement.',
      technologies: ['SEO', 'Advertising', 'Social Media Management', 'Website Design']
    },
    {
      title: 'Social Media Coordinator',
      company: 'Liftable Media',
      period: '03/2022 - 8/2022',
      location: 'Phoenix, AZ',
      description: 'Planned, created, and scheduled content for Western Journal News. Helped establish a successful workflow for producing and distributing news shorts on TikTok, YouTube, and Instagram Reels.',
      technologies: ['Content Creation', 'Social Media Management', 'Video Editing']
    },
    {
      title: 'Substitute Teacher',
      company: 'DVUSD',
      period: '09/2020 - 05/2021',
      location: 'Phoenix, AZ',
      description: 'Delivered flexible teaching solutions, adapting to various educational levels and classroom needs.',
      technologies: ['Teaching', 'Classroom Management', 'Curriculum Development']
    },
    {
      title: 'Volunteer Moderator/Event Manager',
      company: 'JoshDub’s Discord Server',
      period: '11/2019 - 05/2022',
      location: 'Online',
      description: 'Assisted in managing a +90,000 member online community, while organizing events.',
      technologies: ['Community Management', 'Event Planning', 'Discord Bot Development']
    },
    {
      title: 'Combat Medic/Healthcare Specialist',
      company: 'U.S. Army',
      period: '06/2013 - 06/2018',
      location: 'Fort Bragg, NC & Vicenza, Italy',
      description: 'Delivered emergency medical treatment and primary care for soldiers in both normal, and critical situations.',
      technologies: ['EMT', 'Military Medicine', 'Combat Support']
    }
  ].map(exp => ({ ...exp, isActive: false }));
  education = [
    {
      degree: 'Associates of Applied Science in Web Development',
      institution: 'Glendale Community College',
      period: '09/2024 - Present',
      location: 'Glendale, AZ',
      description: 'Started with basic HTML, CSS, and JavaScript Knowledge, the desire to learn how to code professionally, quickly turned into a passion more than anything else.'
    }
    ,
    {
      degree: 'Bachelor of Science in Political Science',
      institution: 'Methodist University',
      period: '09/2018 - 05/2020',
      location: 'Fayetteville, NC',
      description: 'Completed with concentrations in International Relations, Public Administration, and a minor in History. While also completing Leadership Fellows and NSLS curriculum and requirements.'
    }
  ];
  skills = [
    {
      category: 'Frontend',
      items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Material UI', 'Bootstrap', 'React', 'Vue.js', 'Next.js', 'Gatsby', 'Lit', 'Svelte', 'Preact']
    },
    {
      category: 'Tools & Methodologies',
      items: ['Git', 'Webpack', 'Nx', 'JIRA', 'Agile', 'Scrum', 'CI/CD', 'Jest', 'Cypress', 'Storybook', 'ESLint', 'Prettier', 'Postman']
    },
    {
      category: 'Backend & Others',
      items: ['Node.js', 'Express', 'RESTful APIs', 'Firebase', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Apollo']
    },
    {
      category: 'AI & Machine Learning',
      items: ['Python', 'TensorFlow', 'OpenAI API', 'Natural Language Processing (NLP)']
    },
    {
      category: 'Algorithms & Data Structures',
      items: ['Big O Notation', 'Sorting Algorithms', 'Graph Algorithms', 'Dynamic Programming']
    },
    {
      category: 'Game Development',
      items: ['Unreal Engine', 'C++', 'C', 'Python']
    }
  ];

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
        filter(section => section !== this.activeSection)
      )
      .subscribe(section => {
        this.activeSection = section;
      });
  }

  initAnimations() {
    // Animate timeline progress based on scroll
    ScrollTrigger.create({
      trigger: this.timeline.nativeElement,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        gsap.to(this.timelineProgress.nativeElement, {
          scaleY: self.progress,
          duration: 0.1,
          ease: 'none'
        });
      }
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

  scrollToSection(index: number) {
    this.activeSection = index;

    const sections = document.querySelectorAll('.resume-section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
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

  getSkillLevel(skill: string): number {
    // Mock skill levels - in a real app, you'd have actual data
    const skillLevels: Record<string, number> = {
      'Angular': 9,
      'TypeScript': 9,
      'JavaScript': 8,
      'React': 7,
      'Node.js': 8,
      'HTML5': 9,
      'CSS3': 8,
      // Add more skills as needed
    };

    return skillLevels[skill] || Math.floor(Math.random() * 5) + 5; // Default 5-10 range
  }
}
