import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {ThemeSelectorComponent} from './theme-selector.component';
import {VersionSelectorComponent} from './version-selector.component';

@Component({
  selector: 'app-settings-switcher',
  standalone: true,
  imports: [CommonModule, ThemeSelectorComponent, VersionSelectorComponent],
  template: `
    <div class="fixed bottom-6 right-6 z-50">
      <div
        *ngIf="isOpen"
        [@fadeAnimation]
        class="bg-background p-4 rounded-lg shadow-lg mb-4 w-72 border border-border"
      >
        <div class="mb-4">
          <h3 class="text-headingText font-bold mb-2">Select Theme</h3>
          <app-theme-selector></app-theme-selector>
        </div>
        <div>
          <h3 class="text-headingText font-bold mb-2">Select Portfolio</h3>
          <app-version-selector></app-version-selector>
        </div>
      </div>

      <button
        aria-label="Toggle settings"
        class="bg-main hover:bg-secondary text-background p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        (click)="toggleSwitcher()"
      >
        <svg
          [ngClass]="{'animate-spin': isOpen, 'text-xl': true}"
          height="1em"
          viewBox="0 0 512 512"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free -->
          <path
            d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .animate-spin {
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class SettingsSwitcherComponent {
  isOpen = false;

  toggleSwitcher(): void {
    this.isOpen = !this.isOpen;
  }
}
