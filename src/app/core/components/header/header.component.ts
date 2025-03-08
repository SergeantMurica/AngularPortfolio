import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ModeService} from '../../services/mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary" class="px-4 py-2">
      <div class="container mx-auto flex justify-between items-center">
        <a routerLink="/" class="text-lg font-bold no-underline relative text-background">
          <span class="absolute inline-block animate-pulse text-xs top-4 left-35 w-full h-1 rotate-18">Angular</span>
          The Pantheon Dev
        </a>

        <div class="hidden md:block">
          <nav class="flex gap-4">
            <a mat-button routerLink="/" routerLinkActive="bg-primary-dark"
               [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a mat-button routerLink="/resume" routerLinkActive="bg-primary-dark">Resume</a>
            <a mat-button routerLink="/portfolio" routerLinkActive="bg-primary-dark">Portfolio</a>
            <a mat-button routerLink="/blog" routerLinkActive="bg-primary-dark">Blog</a>
            <a mat-button routerLink="/contact" routerLinkActive="bg-primary-dark">Contact</a>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <button mat-icon-button (click)="toggleTheme()" aria-label="Toggle theme">
            <mat-icon>{{ (modeService.mode$ | async) === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <button mat-icon-button class="md:hidden" [matMenuTriggerFor]="menu" aria-label="Menu">
            <mat-icon>menu</mat-icon>
          </button>

          <mat-menu #menu="matMenu">
            <a mat-menu-item routerLink="/">Home</a>
            <a mat-menu-item routerLink="/resume">Resume</a>
            <a mat-menu-item routerLink="/portfolio">Portfolio</a>
            <a mat-menu-item routerLink="/blog">Blog</a>
            <a mat-menu-item routerLink="/contact">Contact</a>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
})
export class HeaderComponent {
  constructor(public modeService: ModeService) {
  }

  toggleTheme() {
    this.modeService.toggleMode();
  }
}
