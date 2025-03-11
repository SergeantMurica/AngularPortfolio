import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {BlogPost, BlogService} from '../../../core/services/blog.service';
import {Observable, of, switchMap} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
    <div class="container mx-auto py-8">
      <a mat-button color="primary" class="mb-4" routerLink="/blog">
        Back to Blog
      </a>

      <ng-container *ngIf="blogPost$ | async as post; else loading">
        <div class="max-w-3xl mx-auto">
          <img
            [ngSrc]="post.image"
            [height]="48"
            [width]="48"
            [alt]="post.title"
            class="w-full h-64 object-cover rounded-lg mb-6"
          />

          <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>

          <div class="flex items-center text-gray-600 dark:text-gray-300 mb-4">
            <span>{{ post.date | date:'mediumDate' }}</span>
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <mat-chip-option *ngFor="let tag of post.tags"
                             [disableRipple]="true" [selectable]="false">
              {{ tag }}
            </mat-chip-option>
          </div>

          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-lg font-medium mb-4">{{ post.excerpt }}</p>
            <div [innerHTML]="post.content"></div>
          </div>
        </div>
      </ng-container>

      <ng-template #loading>
        <div class="flex justify-center items-center h-64">
          <p>Loading post...</p>
        </div>
      </ng-template>
    </div>
  `
})
export class BlogDetailComponent implements OnInit {
  blogPost$!: Observable<BlogPost | undefined>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.blogPost$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/blog']);
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
}
