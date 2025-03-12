import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { StateService } from '../../core/services/state.service';
import { ThemeService } from '../../core/services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop'; // Angular's new Signals API
import { gsap } from 'gsap'; // Add GSAP for advanced animations

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    NgOptimizedImage
  ],
  template: `
    <div class="home-container">
      <!-- Interactive 3D Hero Section -->
      <section class="hero-section">

        <div class="content-container" @fadeInStagger>
          <div class="profile-container">
            <div class="profile-image-wrapper">
              <img
                ngSrc="/assets/images/profileImage.png"
                alt="Profile"
                class="profile-image"
                height="500" width="500"
                (mouseenter)="animateProfile(true)"
                (mouseleave)="animateProfile(false)"
                #profileImage
              />
              <div class="profile-glow" #profileGlow></div>
            </div>
          </div>

          <div class="text-content">
            <h1 class="name-title" #nameTitle>{{ userInfo.name }}</h1>
            <h2 class="job-title" #jobTitle>{{ userInfo.title }}</h2>

            <p class="bio-text" #bioText>
              {{ aboutMe.start }}
            </p>

            <div class="cta-buttons" #ctaButtons>
              <a mat-raised-button class="main-cta" routerLink="/portfolio">
                <span class="btn-text">View My Work</span>
                <span class="btn-icon">→</span>
              </a>
              <a mat-stroked-button class="secondary-cta" routerLink="/contact">Contact Me</a>
              <a mat-stroked-button class="secondary-cta" routerLink="/resume">My Resume</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Tech Stack -->
      <section class="tech-stack-section" #techStackSection>
        <h2 class="section-title">My Technology Arsenal</h2>

        <div class="tech-orbit-container" #orbitContainer>
          <div class="orbit-center" #orbitCenter>
            <span class="center-text">Tech Stack</span>
          </div>

          <div class="orbit-ring" #orbitRing>
            <div *ngFor="let tech of featuredTech; let i = index"
                 class="tech-item"
                 [ngStyle]="getTechItemStyle(i)"
                 (click)="selectTech(tech)"
                 #techItems>
              <div class="tech-icon">
                <img [ngSrc]="tech.logo" [alt]="tech.name" height="32" width="32"/>
              </div>
            </div>
          </div>
        </div>

        <div class="tech-details" #techDetails *ngIf="selectedTech" @fadeSlide>
          <h3>{{ selectedTech.name }}</h3>
          <p>{{ getTechDescription(selectedTech.name) }}</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      overflow-x: hidden;
    }


    .hero-section {
      height: 69vh;
      width: 100%;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      perspective: 1000px;
    }


    .content-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      z-index: 10;
      padding: 0 2rem;
      gap: 4rem;
      flex-wrap: wrap;
    }

    .profile-container {
      position: relative;
    }

    .profile-image-wrapper {
      position: relative;
      width: 280px;
      height: 280px;
    }

    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .profile-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      background: radial-gradient(circle at center, var(--color-highlight), transparent 70%);
      opacity: 0;
      filter: blur(15px);
      z-index: -1;
      transform: scale(1.2);
    }

    .text-content {
      flex: 1;
      min-width: 300px;
    }

    .name-title {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, var(--color-main), var(--color-highlight));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0; /* For animation */
    }

    .job-title {
      font-size: 1.8rem;
      color: var(--color-secondary);
      margin-bottom: 1.5rem;
      opacity: 0; /* For animation */
    }

    .bio-text {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0; /* For animation */
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      opacity: 0; /* For animation */
    }

    .main-cta {
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      color: white;
      padding: 0.6rem 1.5rem;
      border-radius: 30px;
      font-weight: 600;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .main-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .main-cta:hover .btn-icon {
      transform: translateX(3px);
    }

    .btn-icon {
      transition: transform 0.3s ease;
    }

    .secondary-cta {
      border: 2px solid var(--color-main);
      color: var(--color-main);
      padding: 0.6rem 1.5rem;
      border-radius: 30px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .secondary-cta:hover {
      background: rgba(var(--color-main), 0.1);
      transform: translateY(-3px);
    }

    /* Tech Stack Orbit */
    .tech-stack-section {
      padding: 6rem 2rem;
      position: relative;
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 4rem;
      text-align: center;
      color: var(--color-headingText);
    }

    .tech-orbit-container {
      position: relative;
      width: 100%;
      max-width: 600px;
      height: 600px;
      margin: 0 auto;
      overflow: hidden;
    }

    .orbit-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      z-index: 5;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .orbit-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px dashed var(--color-border);
      overflow: visible;
    }

    .tech-item {
      position: absolute;
      top: 45%;
      left: 45%;
      width: 60px;
      height: 60px;
      background: var(--color-main);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      cursor: pointer;
      z-index: 2;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    .tech-item:hover {
      transform: scale(1.2);
      z-index: 10;
      background: white;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .tech-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }


    .tech-details {
      margin-top: 3rem;
      padding: 1.5rem;
      background: var(--color-container);
      border-radius: 10px;
      max-width: 500px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
  `],
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.name-title, .job-title, .bio-text, .cta-buttons', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  userInfo = {
    name: 'Alex Developer',
    title: 'Full Stack Engineer',
    email: 'castroalexander1995@outlook.com'
  };

  aboutMe = {
    title: "About me",
    start: "I am a dedicated full-stack developer with a diverse background in military service, education, and social media marketing. My passion lies in crafting efficient and innovative web solutions that make a meaningful impact."
  };

  techStack = [
    {name: "SQLite", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/sqlite.svg"},
    {name: "Express", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/express.svg"},
    {name: "Python", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/python.svg"},
    {name: "C++", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/cplusplus.svg"},
    {name: "Unreal Engine", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/unrealengine.svg"},
    {name: "Material-UI", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/material-ui.svg"},
    {name: "DaVinci Resolve", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/davinciresolve.svg"},
    {name: "React", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg"},
    {name: "Firebase", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/firebase.svg"},
    {name: "Buffer", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/buffer.svg"},
    {name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/mongodb.svg"},
    {name: "Git", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/git.svg"},
    {name: "Swift", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/swift.svg"},
    {name: "GitLab", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/gitlab.svg"},
    {name: "Node.JS", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/nodejs.svg"},
    {name: "GitHub", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg"},
    {name: "Postgres", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/postgresql.svg"},
    {name: "CSS", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/css3.svg"},
    {name: "Hootsuite", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/hootsuite.svg"},
    {name: "React Native", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg"},
    {name: "Vercel", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/vercel.svg"},
    {name: "HTML", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/html5.svg"},
    {name: "C", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/c.svg"},
    {name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg"},
    {name: "TypeScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/typescript.svg"},
    {name: "MySQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/mysql.svg"},
  ];

  // Featured tech to show in the orbit
  featuredTech = this.techStack.slice(0, 12);
  selectedTech: any = null;

  // Element references for animations
  @ViewChild('profileImage') profileImage!: ElementRef;
  @ViewChild('profileGlow') profileGlow!: ElementRef;
  @ViewChild('nameTitle') nameTitle!: ElementRef;
  @ViewChild('jobTitle') jobTitle!: ElementRef;
  @ViewChild('bioText') bioText!: ElementRef;
  @ViewChild('ctaButtons') ctaButtons!: ElementRef;
  @ViewChild('orbitContainer') orbitContainer!: ElementRef;
  @ViewChild('orbitRing') orbitRing!: ElementRef;

  // Inject services
  private stateService = inject(StateService);
  private themeService = inject(ThemeService);
  private orbitAnimation: any;
  private documentHidden = false;

  // Convert Observable to Signal (new Angular feature)
  theme = toSignal(this.themeService.theme$, { initialValue: 'default' });

  ngOnInit() {
    // Get user info from state if needed
    this.stateService.getState().subscribe(state => {
      this.userInfo = state.user;
    });
  }

  getTechItemStyle(index: number) {
    const angle = (360 / this.featuredTech.length) * index;
    const radius = 250; // Distance from center
    return {
      transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
      transformOrigin: 'center center'
    };
  }


  ngAfterViewInit() {
    this.initProfileAnimation();
    this.initTextAnimation();
    this.initOrbitAnimation();
  }


  initProfileAnimation() {
    gsap.set(this.profileGlow.nativeElement, { opacity: 0 });

    gsap.fromTo(this.profileImage.nativeElement,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.2 }
    );
  }

  initTextAnimation() {
    const elements = [
      this.nameTitle.nativeElement,
      this.jobTitle.nativeElement,
      this.bioText.nativeElement,
      this.ctaButtons.nativeElement
    ];

    gsap.fromTo(elements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out', delay: 0.5 }
    );
  }

  initOrbitAnimation() {
    // Kill any existing animations first
    gsap.killTweensOf(this.orbitRing.nativeElement);

    // Create and store the animation
    this.orbitAnimation = gsap.to(this.orbitRing.nativeElement, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });
  }

  animateProfile(isHovering: boolean) {
    if (isHovering) {
      gsap.to(this.profileImage.nativeElement, {
        scale: 1.05,
        rotate: '-5deg',
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(this.profileGlow.nativeElement, {
        opacity: 0.7,
        duration: 0.4
      });
    } else {
      gsap.to(this.profileImage.nativeElement, {
        scale: 1,
        rotate: '0deg',
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(this.profileGlow.nativeElement, {
        opacity: 0,
        duration: 0.4
      });
    }
  }

  selectTech(tech: any) {
    this.selectedTech = tech;
  }

  getTechDescription(techName: string): string {
    const descriptions: Record<string, string> = {
      'Angular': 'I love its structure and powerful features for building dynamic web applications.',
      'React': 'My primary frontend framework - Used for building interactive user interfaces, especially for single-page applications.',
      'Node.js': 'My go-to for server-side JavaScript runtime environment.',
      'TypeScript': 'The foundation of my development - strong typing improves code quality and maintenance.',
      'Firebase': 'My preferred backend-as-a-service platform for real-time database and authentication.',
      'GitHub': 'My primary platform for version control and code hosting.',
      'Vercel': 'My preferred platform for deploying and hosting static and serverless applications.',
      'Tailwind CSS': 'My preferred CSS framework for utility-first styling and rapid UI development.',
      'MongoDB': 'My preferred NoSQL database for scalable and flexible data storage.',
      'Express': 'My preferred Node.js web application framework for building APIs and web applications.',
      'PostgreSQL': 'My preferred relational database for structured data storage and management.',
      'Python': 'My preferred language for AI and machine learning projects.',
      'JavaScript': 'My first language for frontend and backend development.',
    };

    return descriptions[techName] || `A key technology in my stack that I use for building modern web applications.`;
  }




  ngOnDestroy() {
    // Clean up event listeners when component is destroyed
    document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.documentHidden = true;
    } else {
      // Document is visible again
      if (this.documentHidden) {
        this.documentHidden = false;
        this.restartAnimations();
      }
    }
  }

  restartAnimations() {
    // Restart the orbit animation
    if (this.orbitRing && this.orbitRing.nativeElement) {
      // Kill any existing animations on this element
      gsap.killTweensOf(this.orbitRing.nativeElement);

      // Restart the animation
      this.orbitAnimation = gsap.to(this.orbitRing.nativeElement, {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center'
      });
    }


    if (this.nameTitle && this.nameTitle.nativeElement &&
      parseFloat(getComputedStyle(this.nameTitle.nativeElement).opacity) < 1) {
      this.initTextAnimation();
    }



    if (this.profileImage && this.profileImage.nativeElement) {
      gsap.to(this.profileImage.nativeElement, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
    }
  }

}
