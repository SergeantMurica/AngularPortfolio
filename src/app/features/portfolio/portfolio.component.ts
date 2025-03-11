import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Portfolio, portfolio } from '../../../utils/resumeData';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    NgOptimizedImage
  ],
  template: `
    <div class="project-modal">
      <div class="modal-header">
        <h2>{{project.title}}</h2>
        <button mat-icon-button (click)="closeDialog()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="modal-body">
        <div class="project-image">
          <img
            [ngSrc]="project.image"
            [alt]="project.title"
            width="800"
            height="500"
            priority
          />
        </div>

        <div class="project-details">
          <div class="project-description">
            <h3>Overview</h3>
            <p>{{project.description}}</p>

            <div class="project-features" *ngIf="project.tags">
              <h3>Key Features</h3>
              <ul>
                <li *ngFor="let feature of project.tags">{{feature}}</li>
              </ul>
            </div>

            <div class="project-challenges" *ngIf="project.challenges">
              <h3>Challenges & Solutions</h3>
              <p>{{project.challenges}}</p>
            </div>
          </div>

          <div class="project-tech">
            <h3>Technologies Used</h3>
            <div class="tech-tags">
              <span *ngFor="let tech of project.tags" class="tech-tag">
                {{tech.tag}}
              </span>
            </div>
          </div>

          <div class="project-links">
            <a *ngFor="let link of project.links"
               [href]="link.link"
               target="_blank"
               mat-raised-button
               color="primary">
              <mat-icon>{{link.icon}}</mat-icon>
              {{getLinkLabel(link.icon)}}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-modal {
      max-width: 900px;
      padding: 0;
      overflow: hidden;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid var(--color-border);
    }

    .modal-header h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0;
      color: var(--color-headingText);
    }

    .modal-body {
      padding: 2rem;
      max-height: 80vh;
      overflow-y: auto;
    }

    .project-image {
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .project-image img {
      width: 100%;
      height: auto;
      display: block;
    }

    .project-details {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--color-headingText);
    }

    .project-description {
      margin-bottom: 2rem;
    }

    .project-description p {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .project-features ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .project-features li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      padding: 0.5rem 1rem;
      background: var(--color-shading);
      border-radius: 30px;
      font-size: 0.9rem;
    }

    .project-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      grid-column: span 2;
    }

    .project-links a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 768px) {
      .project-details {
        grid-template-columns: 1fr;
      }

      .project-links {
        grid-column: 1;
      }
    }
  `]
})
export class ProjectDetailsComponent {
  project!: Portfolio;

  constructor(private dialog: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  getLinkLabel(icon: string): string {
    const labels: Record<string, string> = {
      'github': 'View Code',
      'language': 'Live Demo',
      'article': 'Documentation',
      'link': 'Visit Project'
    };

    return labels[icon] || 'View Project';
  }
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    NgOptimizedImage
  ],
  template: `
    <div class="portfolio-container">
      <!-- Background Elements -->
      <div class="portfolio-bg">
        <div class="portfolio-grid"></div>
        <div class="portfolio-glow"></div>
      </div>

      <div class="header-container">
        <h1 class="portfolio-title" #portfolioTitle>My Projects</h1>

        <div class="filter-container" #filterContainer>
          <div class="filter-label">Filter by:</div>
          <div class="category-filters">
            <button
              *ngFor="let category of categories"
              class="filter-button"
              [class.active]="selectedCategory === category"
              (click)="setCategory(category)">
              {{category}}
            </button>
          </div>
        </div>
      </div>

      <div class="projects-grid" #projectsGrid>
        <div
          *ngFor="let project of filteredProjects$ | async"
          class="project-card-wrapper"
          [attr.data-category]="project.tags"
          (mouseenter)="animateProjectCard($event, true)"
          (mouseleave)="animateProjectCard($event, false)"
          (click)="openProjectDetails(project)"
          #projectCards
        >
          <div class="project-card">
            <div class="project-thumbnail">
              <img
                [ngSrc]="project.image"
                [alt]="project.title"
                width="400"
                height="250"
                class="thumbnail-img"
              />
              <div class="project-overlay">
                <div class="project-actions">
                  <button mat-mini-fab color="primary"
                          (click)="openProjectDetails(project); $event.stopPropagation()">
                    <mat-icon>fullscreen</mat-icon>
                  </button>

                  <a *ngFor="let link of project.links"
                     [href]="link.link"
                     target="_blank"
                     mat-mini-fab
                     (click)="$event.stopPropagation()">
                    <mat-icon>{{link.icon}}</mat-icon>
                  </a>
                </div>
              </div>
            </div>

            <div class="project-content">
              <h2 class="project-title">{{project.title}}</h2>
              <p class="project-excerpt">{{getExcerpt(project.description)}}</p>

              <div class="project-tags">
                <span *ngFor="let tag of project.tags.slice(0, 3)" class="tag">
                  {{tag.tag}}
                </span>
                <span *ngIf="project.tags.length > 3" class="more-tags">
                  +{{project.tags.length - 3}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state when no projects match filters -->
      <div class="empty-state" *ngIf="(filteredProjects$ | async)?.length === 0">
        <mat-icon>search_off</mat-icon>
        <h3>No projects match your filter</h3>
        <p>Try selecting a different category</p>
        <button mat-raised-button color="primary" (click)="resetFilters()">
          Show All Projects
        </button>
      </div>
    </div>
  `,
  styles: [`
    .portfolio-container {
      min-height: 100vh;
      padding: 2rem;
      position: relative;
      overflow-x: hidden;
    }

    /* Background elements */
    .portfolio-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .portfolio-grid {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: 20px 20px;
      background-image:
        linear-gradient(to right, rgba(var(--color-border), 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(var(--color-border), 0.1) 1px, transparent 1px);
      opacity: 0.5;
    }

    .portfolio-glow {
      position: absolute;
      width: 60%;
      height: 30%;
      background: radial-gradient(circle, var(--color-highlight) 0%, transparent 70%);
      filter: blur(80px);
      opacity: 0.15;
      top: 30%;
      left: 20%;
    }

    /* Header styling */
    .header-container {
      max-width: 1200px;
      margin: 0 auto 3rem;
      text-align: center;
    }

    .portfolio-title {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Filter styling */
    .filter-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
    }

    .filter-label {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 1rem;
      color: var(--color-captionText);
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
    }

    .filter-button {
      padding: 0.6rem 1.2rem;
      border-radius: 30px;
      background: var(--color-shading);
      border: none;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-bodyText);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-button:hover, .filter-button.active {
      background: var(--color-main);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(var(--color-main), 0.3);
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .project-card-wrapper {
      cursor: pointer;
      perspective: 1000px;
    }

    .project-card {
      background: var(--color-container);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 1px solid var(--color-border);
    }

    .project-thumbnail {
      height: 200px;
      overflow: hidden;
      position: relative;
    }

    .thumbnail-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1s ease;
    }

    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .project-actions {
      display: flex;
      gap: 1rem;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    }

    .project-card-wrapper:hover .project-overlay {
      opacity: 1;
    }

    .project-card-wrapper:hover .project-actions {
      transform: translateY(0);
    }

    .project-card-wrapper:hover .thumbnail-img {
      transform: scale(1.1);
    }

    .project-content {
      padding: 1.5rem;
    }

    .project-title {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--color-headingText);
    }

    .project-excerpt {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--color-bodyText);
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      background: var(--color-shading);
      font-size: 0.8rem;
    }

    .more-tags {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      background: var(--color-main);
      color: white;
      font-size: 0.8rem;
    }

    /* Empty state styling */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
    }

    .empty-state mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: var(--color-captionText);
      margin-bottom: 1.5rem;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--color-headingText);
    }

    .empty-state p {
      color: var(--color-captionText);
      margin-bottom: 2rem;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }

      .portfolio-title {
        font-size: 2.5rem;
      }
    }
  `],
  animations: [
    trigger('staggerFade', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  projects: Portfolio[] = [...portfolio].map(project => ({
    ...project,
    // Add mock data for enhanced project details
    category: this.getCategoryForProject(project),
  }));

  // Reactive state management
  private categorySubject = new BehaviorSubject<string>('All Projects');
  selectedCategory$ = this.categorySubject.asObservable();

  // Computed projects based on filter
  filteredProjects$ = this.selectedCategory$.pipe(
    map(category => {
      if (category === 'All Projects') {
        return this.projects;
      }
      return this.projects.filter(project => project.tags.some(t => t.tag === category));
    })
  );

  // All available categories extracted from projects
  categories: string[] = ['All Projects', ...new Set(this.projects.map(project => project.tags.map(t => t.tag)).flat())];

  // Current selection for template binding
  get selectedCategory(): string {
    return this.categorySubject.value;
  }

  // Element references
  @ViewChild('portfolioTitle') portfolioTitle!: ElementRef;
  @ViewChild('filterContainer') filterContainer!: ElementRef;
  @ViewChild('projectsGrid') projectsGrid!: ElementRef;
  @ViewChild('projectCards') projectCards!: ElementRef;

  // Services
  private dialog = inject(MatDialog);

  ngOnInit() {}

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Header animations
    gsap.fromTo(this.portfolioTitle.nativeElement,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    gsap.fromTo(this.filterContainer.nativeElement,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Set up scroll-based animations for project cards
    this.animateProjectsOnScroll();
  }

  animateProjectsOnScroll() {
    const cards = this.projectsGrid.nativeElement.querySelectorAll('.project-card-wrapper');

    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.projectsGrid.nativeElement,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  setCategory(category: string) {
    this.categorySubject.next(category);

    // Re-animate the grid after filter change
    setTimeout(() => {
      this.animateProjectsOnScroll();
    }, 100);
  }

  resetFilters() {
    this.categorySubject.next('All Projects');
  }

  animateProjectCard(event: MouseEvent, isEntering: boolean) {
    const card = (event.currentTarget as HTMLElement).querySelector('.project-card');

    if (isEntering) {
      // Calculate 3D rotation based on mouse position
      const cardRect = card!.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const angleY = -((event.clientX - cardCenterX) / cardRect.width) * 10;
      const angleX = ((event.clientY - cardCenterY) / cardRect.height) * 10;

      gsap.to(card, {
        rotateY: angleY + 'deg',
        rotateX: angleX + 'deg',
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        rotateY: '0deg',
        rotateX: '0deg',
        scale: 1,
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  openProjectDetails(project: Portfolio) {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '80vw',
      maxWidth: '900px',
      panelClass: 'project-details-dialog'
    });

    // Pass data to the dialog component
    (dialogRef.componentInstance as ProjectDetailsComponent).project = project;
  }

  getExcerpt(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  // Helper methods to generate mock data for enhanced project details
  private getCategoryForProject(project: Portfolio): string {
    // Extract category based on project tags
    const tagNames = project.tags.map(t => t.tag.toLowerCase());

    if (tagNames.some(t => t.includes('react') || t.includes('next'))) return 'React';
    if (tagNames.some(t => t.includes('angular'))) return 'Angular';
    if (tagNames.some(t => t.includes('backend') || t.includes('node'))) return 'Backend';
    if (tagNames.some(t => t.includes('game'))) return 'Game Dev';
    if (tagNames.some(t => t.includes('ui') || t.includes('design'))) return 'UI/UX';

    return 'Web Dev';
  }
}
