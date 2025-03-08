import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {BlogPost, BlogService} from '../../../core/services/blog.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    ScrollingModule
  ],
  template: `
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Blog</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ng-container *ngIf="blogPosts$ | async as posts">
          <mat-card *ngFor="let post of posts" class="blog-card">
            <img
              [src]="post.imageUrl"
              [alt]="post.title"
              class="w-full h-48 object-cover"
            />

            <mat-card-header>
              <mat-card-title>{{ post.title }}</mat-card-title>
              <mat-card-subtitle>{{ post.date | date }}</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content class="mt-2">
              <p>{{ post.description }}</p>
            </mat-card-content>

            <div class="flex flex-wrap gap-2 px-4 my-2">
              <mat-chip-option *ngFor="let tag of post.tags"
                               [disableRipple]="true" [selectable]="false">
                {{ tag }}
              </mat-chip-option>
            </div>

            <mat-card-actions>
              <a mat-button color="primary" [routerLink]="['/blog', post.id]">Read More</a>
            </mat-card-actions>
          </mat-card>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .blog-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    mat-card-content {
      flex-grow: 1;
    }

    mat-card-actions {
      padding-top: 0;
    }
  `]
})
export class BlogListComponent implements OnInit {
  blogPosts$!: Observable<BlogPost[]>;

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.blogPosts$ = this.blogService.getBlogPosts();
  }
}
