import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="bg-main/20 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-bodyText text-sm">
              © {{ currentYear }} The Pantheon Dev. All rights reserved.
            </p>
          </div>

          <!-- Social media links -->
          <div class="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
               mat-icon-button aria-label="GitHub">
              <mat-icon>code</mat-icon>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               mat-icon-button aria-label="LinkedIn">
              <mat-icon>business</mat-icon>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               mat-icon-button aria-label="Twitter">
              <mat-icon>chat</mat-icon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  get currentYear() {
    return new Date().getFullYear();
  }
}
