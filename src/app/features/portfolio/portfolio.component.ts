import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {animate, style, transition, trigger} from '@angular/animations';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
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
    MatGridListModule
  ],
  template: `
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">My Projects</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <mat-card *ngFor="let project of projects; let i = index"
                  class="project-card" @fadeIn [style.animation-delay]="i * 100 + 'ms'">
          <img
            [src]="project.imageUrl"
            [alt]="project.title"
            class="w-full h-48 object-cover"
          />

          <mat-card-header>
            <mat-card-title>{{ project.title }}</mat-card-title>
          </mat-card-header>

          <mat-card-content class="mt-2">
            <p>{{ project.description }}</p>

            <div class="flex flex-wrap gap-2 mt-4">
              <mat-chip-option *ngFor="let tech of project.technologies"
                               [disableRipple]="true" [selectable]="false">
                {{ tech }}
              </mat-chip-option>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <a mat-button color="primary" [href]="project.githubUrl" target="_blank">
              <mat-icon>code</mat-icon>
              Github
            </a>
            <a mat-button color="accent" [href]="project.demoUrl" target="_blank">
              <mat-icon>visibility</mat-icon>
              Live Demo
            </a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    mat-card-content {
      flex-grow: 1;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('500ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Dashboard',
      description: 'A responsive admin dashboard for an e-commerce platform with real-time analytics and inventory management.',
      imageUrl: 'assets/images/projects/project1.jpg',
      technologies: ['Angular', 'TypeScript', 'NgRx', 'Chart.js'],
      githubUrl: 'https://github.com/username/ecommerce-dashboard',
      demoUrl: 'https://demo.example.com/ecommerce-dashboard'
    },
    {
      id: '2',
      title: 'Social Media App',
      description: 'A full-featured social media application with real-time chat, post sharing, and user authentication.',
      imageUrl: 'assets/images/projects/project2.jpg',
      technologies: ['Angular', 'Firebase', 'RxJS', 'Tailwind CSS'],
      githubUrl: 'https://github.com/username/social-media-app',
      demoUrl: 'https://demo.example.com/social-media-app'
    },
    {
      id: '3',
      title: 'Weather Forecast PWA',
      description: 'A progressive web app that provides weather forecasts based on user location with offline capabilities.',
      imageUrl: 'assets/images/projects/project3.jpg',
      technologies: ['Angular', 'PWA', 'OpenWeather API', 'IndexedDB'],
      githubUrl: 'https://github.com/username/weather-forecast',
      demoUrl: 'https://demo.example.com/weather-forecast'
    },
    {
      id: '4',
      title: 'Task Management System',
      description: 'A Kanban-style task management application with drag-and-drop functionality and team collaboration features.',
      imageUrl: 'assets/images/projects/project4.jpg',
      technologies: ['Angular', 'Angular CDK', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/username/task-management',
      demoUrl: 'https://demo.example.com/task-management'
    },
    {
      id: '5',
      title: 'Budget Tracker',
      description: 'A personal finance application to track expenses, income, and savings goals with visual representations.',
      imageUrl: 'assets/images/projects/project5.jpg',
      technologies: ['Angular', 'D3.js', 'Firebase', 'Angular Material'],
      githubUrl: 'https://github.com/username/budget-tracker',
      demoUrl: 'https://demo.example.com/budget-tracker'
    },
    {
      id: '6',
      title: 'Recipe Finder',
      description: 'A recipe search application that allows users to find recipes based on ingredients they have at home.',
      imageUrl: 'assets/images/projects/project6.jpg',
      technologies: ['Angular', 'Food API', 'SCSS', 'RxJS'],
      githubUrl: 'https://github.com/username/recipe-finder',
      demoUrl: 'https://demo.example.com/recipe-finder'
    }
  ];
}
