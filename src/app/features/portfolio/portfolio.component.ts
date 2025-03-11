import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {animate, style, transition, trigger} from '@angular/animations';
import {Portfolio, portfolio} from '../../../utils/resumeData';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatGridListModule,
    NgOptimizedImage
  ],
  template: `
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">My Projects</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <mat-card *ngFor="let project of projects; let i = index"
                  class="project-card" @fadeIn [style.animation-delay]="i * 100 + 'ms'">
          <img
            [ngSrc]="project.image"
            [height]="48"
            [width]="48"
            [alt]="project.title"
            class="w-full h-48 object-cover"
          />

          <mat-card-header>
            <mat-card-title>{{ project.title }}</mat-card-title>
          </mat-card-header>

          <mat-card-content class="mt-2">
            <p>{{ project.description }}</p>

            <div class="flex flex-wrap gap-2 mt-4">
              <mat-chip-option *ngFor="let tech of project.tags"
                               [disableRipple]="true" [selectable]="false">
                {{ tech.tag }}
              </mat-chip-option>
            </div>
          </mat-card-content>

          <mat-card-actions class="mt-4 flex justify-center gap-4">
            <a mat-button color="primary" *ngFor="let link of project.links"
               [href]="link.link" target="_blank">
              <img alt="{{ link.icon }}" ngSrc="/assets/svg/{{ link.icon }}" height="24" width="24" class="w-6 h-6"/>
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
  projects: Portfolio[] = [...portfolio];
}
