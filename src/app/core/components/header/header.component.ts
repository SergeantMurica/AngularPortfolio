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
    <div class="px-4 py-2 bg-background/40">
      <div class="container mx-auto flex justify-between items-center">
        <a routerLink="/" class="text-lg font-bold no-underline relative text-headingText">
          <span class="absolute inline-block animate-pulse text-xs top-0 left-35 h-1 rotate-18">Angular</span>
          The Pantheon Dev
        </a>

        <div class="hidden md:block">
          <nav class="flex gap-4">
            <a mat-button routerLink="/" routerLinkActive="bg-main"
               [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a mat-button routerLink="/resume" routerLinkActive="bg-main">Resume</a>
            <a mat-button routerLink="/portfolio" routerLinkActive="bg-main">Portfolio</a>
            <a mat-button routerLink="/blog" routerLinkActive="bg-main">Blog</a>
            <a mat-button routerLink="/contact" routerLinkActive="bg-main">Contact</a>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <button mat-icon-button (click)="toggleTheme()" aria-label="Toggle theme">
            <mat-icon class="align-center justify-center items-center" >{{ modeService.getCurrentMode() === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon>
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
    </div>
  `,
})
export class HeaderComponent {
  constructor(public modeService: ModeService) {
  }

  toggleTheme() {
    this.modeService.toggleMode();
  }
}
