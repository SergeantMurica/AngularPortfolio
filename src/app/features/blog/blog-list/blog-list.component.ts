import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BlogPost, BlogService } from '../../../core/services/blog.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ScrollingModule,
    NgOptimizedImage
  ],
  template: `
    <div class="blog-container">
      <!-- Decorative background elements -->
      <div class="blog-bg">
        <div class="bg-circle circle1"></div>
        <div class="bg-circle circle2"></div>
        <div class="bg-pattern"></div>
      </div>

      <!-- Blog Header -->
      <div class="blog-header">
        <h1 class="blog-title" #blogTitle>My Blog</h1>
        <p class="blog-subtitle" #blogSubtitle>Thoughts, ideas, and discoveries from my journey</p>

        <!-- Featured Article -->
        <div class="featured-article" *ngIf="featuredPost$ | async as featured" #featuredArticle>
          <div class="featured-card" [routerLink]="['/blog', featured.id]">
            <div class="featured-image">
              <img
                [ngSrc]="featured.image"
                [alt]="featured.title"
                width="800"
                height="400"
                priority
              />
            </div>

            <div class="featured-content">
              <div class="featured-meta">
                <div class="featured-date">{{ featured.date | date:'mediumDate' }}</div>
                <div class="featured-tag">Featured</div>
              </div>

              <h2 class="featured-title">{{ featured.title }}</h2>
              <p class="featured-excerpt">{{ featured.excerpt }}</p>

              <div class="featured-tags">
                <span *ngFor="let tag of featured.tags.slice(0, 3)" class="tag">{{ tag }}</span>
              </div>

              <div class="featured-read-more">
                <span>Read Article</span>
              </div>
            </div>
          </div>
        </div>


        <!-- Search and Filter -->
        <div class="blog-controls" #blogControls>
          <div class="search-container">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search articles</mat-label>
              <input
                matInput
                [(ngModel)]="searchQuery"
                (ngModelChange)="onSearchChange($event)"
                placeholder="Search by title or content"
              >
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>

        </div>
      </div>


      <!-- Blog Grid -->
      <div class="blog-grid-container">
        <!-- Status Messages -->
        <div class="status-container" *ngIf="(filteredPosts$ | async)?.length === 0">
          <div class="no-results" *ngIf="searchQuery; else loading">
            <mat-icon>search_off</mat-icon>
            <h3>No articles found</h3>
            <p>Try adjusting your search or filters</p>
            <button mat-raised-button color="primary" (click)="resetFilters()">
              Show All Articles
            </button>
          </div>

          <ng-template #loading>
            <div class="loading">
              <div class="loading-spinner"></div>
              <p>Loading articles...</p>
            </div>
          </ng-template>
        </div>

        <!-- Blog Grid -->
        <div class="blog-grid" #blogGrid>
          <ng-container *ngIf="filteredPosts$ | async as posts">
            <div
              *ngFor="let post of posts"
              class="blog-card-wrapper"
              #blogCards
              (mouseenter)="animateBlogCard($event, true)"
              (mouseleave)="animateBlogCard($event, false)">
              <div class="blog-card" [routerLink]="['/blog', post.id]">
                <div class="card-image">
                  <img
                    [ngSrc]="post.image"
                    [alt]="post.title"
                    width="400"
                    height="250"
                  />
                  <div class="card-date">{{ post.date | date:'mediumDate' }}</div>
                </div>

                <div class="card-content">
                  <h2 class="card-title">{{ post.title }}</h2>
                  <p class="card-excerpt">{{ post.excerpt }}</p>

                  <div class="card-tags">
                    <span *ngFor="let tag of post.tags.slice(0, 3)" class="tag">{{ tag }}</span>
                  </div>

                  <div class="card-footer">
                    <span class="read-time">{{ getReadTime(post) }} min read</span>
                    <span class="read-more">Read More</span>
                  </div>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .blog-container {
      min-height: 100vh;
      position: relative;
      padding: 2rem;
    }

    /* Background elements */
    .blog-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
    }

    .bg-circle {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
    }

    .circle1 {
      width: 300px;
      height: 300px;
      background: var(--color-highlight);
      opacity: 0.15;
      top: 10%;
      right: 10%;
    }

    .circle2 {
      width: 500px;
      height: 500px;
      background: var(--color-main);
      opacity: 0.1;
      bottom: 10%;
      left: 5%;
    }

    .bg-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
      background-size: 30px 30px;
      opacity: 0.3;
    }

    /* Header styling */
    .blog-header {
      max-width: 1200px;
      margin: 0 auto 3rem;
      text-align: center;
    }

    .blog-title {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--color-main), var(--color-highlight));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }

    .blog-subtitle {
      font-size: 1.2rem;
      color: var(--color-bodyText);
      margin-bottom: 2rem;
    }

    /* Search and filters */
    .blog-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .search-container {
      width: 100%;
      max-width: 500px;
    }

    .search-field {
      width: 100%;
    }


    /* Featured article */
    .featured-article {
      max-width: 1200px;
      margin: 0 auto 4rem;
    }

    .featured-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: var(--color-container);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      cursor: pointer;
      transition: transform 0.3s ease;
      border: 1px solid var(--color-border);
    }

    .featured-card:hover {
      transform: translateY(-5px);
    }

    .featured-image {
      position: relative;
      height: 100%;
    }

    .featured-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .featured-content {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
    }

    .featured-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .featured-date {
      font-size: 0.9rem;
      color: var(--color-captionText);
    }

    .featured-tag {
      padding: 0.3rem 0.8rem;
      background: var(--color-highlight);
      color: white;
      font-size: 0.8rem;
      border-radius: 20px;
      font-weight: 500;
    }

    .featured-title {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 1.3;
      margin-bottom: 1rem;
      color: var(--color-headingText);
    }

    .featured-excerpt {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      flex-grow: 1;
    }

    .featured-tags {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .featured-read-more {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-main);
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .featured-card:hover .featured-read-more {
      gap: 0.8rem;
    }

    /* Blog grid */
    .blog-grid-container {
      max-width: 1200px;
      margin: 0 auto 4rem;
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .blog-card-wrapper {
      perspective: 1000px;
      cursor: pointer;
    }

    .blog-card {
      background: var(--color-container);
      border-radius: 16px;
      overflow: hidden;
      height: 100%;
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
      transform-style: preserve-3d;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 1px solid var(--color-border);
    }

    .card-image {
      height: 200px;
      position: relative;
      overflow: hidden;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .blog-card:hover .card-image img {
      transform: scale(1.1);
    }

    .card-date {
      position: absolute;
      bottom: 0;
      right: 0;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
      border-top-left-radius: 8px;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-title {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 0.75rem;
      color: var(--color-headingText);
    }

    .card-excerpt {
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: var(--color-bodyText);
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tag {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      background: var(--color-shading);
      font-size: 0.8rem;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--color-border);
      padding-top: 1rem;
    }

    .read-time {
      font-size: 0.85rem;
      color: var(--color-captionText);
    }

    .read-more {
      color: var(--color-main);
      font-weight: 500;
      font-size: 0.9rem;
      transition: transform 0.3s ease;
    }

    .blog-card:hover .read-more {
      transform: translateX(5px);
    }

    /* Status messages */
    .status-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .no-results, .loading {
      text-align: center;
      padding: 3rem;
    }

    .no-results mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: var(--color-captionText);
      margin-bottom: 1.5rem;
    }

    .no-results h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--color-headingText);
    }

    .no-results p {
      color: var(--color-captionText);
      margin-bottom: 2rem;
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(var(--color-main), 0.3);
      border-radius: 50%;
      border-top-color: var(--color-main);
      animation: spin 1s linear infinite;
      margin: 0 auto 1.5rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }



    .newsletter-content h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .newsletter-content p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }



    /* Responsive design */
    @media (max-width: 992px) {
      .featured-card {
        grid-template-columns: 1fr;
      }

      .featured-image {
        height: 300px;
      }

    }

    @media (max-width: 768px) {
      .blog-title {
        font-size: 2.5rem;
      }

      .blog-grid {
        grid-template-columns: 1fr;
      }

      .featured-title {
        font-size: 1.8rem;
      }
    }
  `],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
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
export class BlogListComponent implements OnInit, AfterViewInit {
  // State management
  searchQuery = '';
  private searchSubject = new BehaviorSubject<string>('');

  // Blog data
  blogPosts$!: Observable<BlogPost[]>;
  filteredPosts$!: Observable<BlogPost[]>;
  featuredPost$!: Observable<BlogPost | null>;


  // Element references
  @ViewChild('blogTitle') blogTitle!: ElementRef;
  @ViewChild('blogSubtitle') blogSubtitle!: ElementRef;
  @ViewChild('blogControls') blogControls!: ElementRef;
  @ViewChild('featuredArticle') featuredArticle!: ElementRef;
  @ViewChild('blogGrid') blogGrid!: ElementRef;
  @ViewChild('newsletter') newsletter!: ElementRef;

  // Services
  private blogService = inject(BlogService);

  constructor() {}

  ngOnInit() {
    // Initialize blog data
    this.blogPosts$ = this.blogService.getBlogPosts();

    // Create featured post stream
    this.featuredPost$ = this.blogPosts$.pipe(
      map(posts => posts.length > 0 ? posts[0] : {} as BlogPost)
    );

    // Set up filtered posts observable
    const search$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    this.filteredPosts$ = combineLatest([
      this.blogPosts$,
      search$
    ]).pipe(
      map(([posts, searchTerm]) => {
        let filtered = [...posts];

        // Remove featured post from regular listing
        if (filtered.length > 0) {
          filtered = filtered.slice(1);
        }

        // Apply search filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(term) ||
            post.excerpt.toLowerCase().includes(term) ||
            post.content.toLowerCase().includes(term)
          );
        }

        return filtered;
      })
    );
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Header animations
    gsap.fromTo(this.blogTitle.nativeElement,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    gsap.fromTo(this.blogSubtitle.nativeElement,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(this.blogControls.nativeElement,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out'
      }
    );

    // Staggered appearance of blog cards
    gsap.fromTo(
      this.featuredArticle.nativeElement,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.6,
        ease: 'power2.out'
      }
    );
  }



  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  resetFilters() {
    this.searchQuery = '';
    this.searchSubject.next('');
  }

  animateBlogCard(event: MouseEvent, isEntering: boolean) {
    const card = (event.currentTarget as HTMLElement).querySelector('.blog-card');

    if (isEntering) {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  getReadTime(post: BlogPost): number {
    // Mock read time calculation
    const wordsPerMinute = 200;
    const wordCount = post.content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

