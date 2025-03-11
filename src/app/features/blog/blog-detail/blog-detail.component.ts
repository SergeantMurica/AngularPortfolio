import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
  OnDestroy, Inject
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BlogPost, BlogService } from '../../../core/services/blog.service';
import {Observable, of, Subject, switchMap} from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    NgOptimizedImage
  ],
  template: `
    <div class="blog-detail-container">
      <div class="blog-detail-bg">
        <div class="detail-circle circle1"></div>
        <div class="detail-circle circle2"></div>
      </div>
      <div class="container mx-auto py-12">
        <button
          mat-button
          class="back-button"
          routerLink="/blog"
          #backButton
          (mouseenter)="animateBackButton(true)"
          (mouseleave)="animateBackButton(false)"
        >
          Back to Blog
        </button>

        <div
          class="blog-post"
          *ngIf="blogPost$ | async as post; else loading"
          #blogPostCard
        >
          <div class="post-header" #postHeader>
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="post-meta">
              <span class="date">{{ post.date | date : 'mediumDate' }}</span>
              <div class="tags">
                <mat-chip-option
                  *ngFor="let tag of post.tags"
                  [disableRipple]="true"
                  [selectable]="false"
                >
                  {{ tag }}
                </mat-chip-option>
              </div>
            </div>
          </div>

          <div class="post-image-container" #postImageContainer>
            <img
              [ngSrc]="post.image"
              [alt]="post.title"
              width="800"
              height="450"
              class="post-image"
            />
          </div>

          <div class="post-content" #postContent>
            <div
              class="content"
              [innerHTML]="post.content"
            ></div>
          </div>
        </div>

        <ng-template #loading>
          <div class="loading">
            <mat-icon>hourglass_empty</mat-icon>
            <h3>Loading post...</h3>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }

    .blog-detail-container {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    /* Background styles */
    .blog-detail-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .detail-circle {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.15;
    }

    .detail-circle.circle1 {
      width: 400px;
      height: 400px;
      background: var(--color-highlight);
      top: 10%;
      left: 5%;
    }

    .detail-circle.circle2 {
      width: 500px;
      height: 500px;
      background: var(--color-main);
      bottom: 10%;
      right: 5%;
    }

    /* Back button */
    .back-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
      padding: 0.6rem 1.2rem;
      border-radius: 30px;
      color: var(--color-main);
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
      border: 2px solid var(--color-main);
      background: none;
    }

    .back-button:hover {
      background: rgba(var(--color-main), 0.1);
    }

    /* Post styles */
    .blog-post {
      max-width: 900px;
      margin: 0 auto;
      background: var(--color-container);
      border-radius: 16px;
      padding: 3rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--color-border);
    }

    .post-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .post-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-headingText);
    }

    .post-meta {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      color: var(--color-captionText);
      margin-bottom: 1.5rem;
    }

    .post-meta .date {
      font-size: 0.9rem;
    }

    .post-meta .tags {
      display: flex;
      gap: 0.5rem;
    }

    .post-image-container {
      margin-bottom: 2.5rem;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .post-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .post-content {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--color-bodyText);
    }

    .post-content p {
      margin-bottom: 1.5rem;
    }

    /* Loading state */
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      color: var(--color-captionText);
    }

    .loading mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      margin-bottom: 1rem;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .post-title {
        font-size: 2.5rem;
      }

      .post-meta {
        flex-direction: column;
        align-items: flex-start;
      }

      .blog-post {
        padding: 2rem;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class BlogDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  blogPost$!: Observable<BlogPost | undefined>;
  private destroy$ = new Subject<void>();

  @ViewChild('backButton') backButton!: ElementRef;
  @ViewChild('blogPostCard') blogPostCard!: ElementRef;
  @ViewChild('postHeader') postHeader!: ElementRef;
  @ViewChild('postImageContainer') postImageContainer!: ElementRef;
  @ViewChild('postContent') postContent!: ElementRef;



  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  constructor(
  ) {}

  ngOnInit() {
    this.blogPost$ = this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/blog']).then(() => {
            window.location.reload();
          });
          return of(undefined);
        }
        return this.blogService.getBlogPost(id).pipe(
          catchError(error => {
            console.error('Error fetching blog post', error);
            this.router.navigate(['/blog']).then(() => {
              window.location.reload();
            });
            return of(undefined);
          })
        );
      })
    );
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initAnimations() {
    gsap.fromTo(
      this.backButton.nativeElement,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(
      this.blogPostCard.nativeElement,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    gsap.fromTo(
      this.postHeader.nativeElement,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      this.postImageContainer.nativeElement,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.7, ease: 'power2.out' }
    );

    gsap.fromTo(
      this.postContent.nativeElement,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.9, ease: 'power2.out' }
    );
  }

  animateBackButton(isHovering: boolean) {
    gsap.to(this.backButton.nativeElement, {
      x: isHovering ? -5 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
}
