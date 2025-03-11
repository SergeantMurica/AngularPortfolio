import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Theme, ThemeService} from '../services/theme.service';
import {Mode, ModeService} from '../services/mode.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="grid grid-cols-3 gap-2 mb-4">
        <button
          *ngFor="let t of themes"
          (click)="setTheme(t.id)"
          class="px-2 py-1 rounded text-sm"
          [ngClass]="{
            'bg-main text-background': currentTheme === t.id,
            'bg-container text-main hover:bg-shading': currentTheme !== t.id
          }"
        >
          {{ t.name }}
        </button>
      </div>

      <div class="flex items-center">
        <button
          class="flex items-center justify-center bg-container hover:bg-shading text-bodyText px-2 py-1 rounded w-full"
          (click)="toggleMode()"
        >
          <ng-container *ngIf="currentMode === 'dark'">
            <svg class="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!-- Sun icon (FaSun) -->
              <path fill="currentColor"
                    d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"/>
            </svg>
            Light Mode
          </ng-container>
          <ng-container *ngIf="currentMode === 'light'">
            <svg class="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!-- Moon icon (FaMoon) -->
              <path fill="currentColor"
                    d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"/>
            </svg>
            Dark Mode
          </ng-container>
        </button>
      </div>
    </div>
  `
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
  themes: Array<{ id: Theme; name: string }> = [
    {id: 'default', name: 'Default'},
    {id: 'coding', name: 'Coding'},
    {id: 'usa', name: 'USA'},
    {id: 'matrix', name: 'Matrix'},
    {id: 'pirate', name: 'Pirate'},
    {id: 'cyberpunk', name: 'Cyberpunk'},
    {id: 'minimalist', name: 'Minimalist'},
    {id: 'retro', name: 'Retro'},
    {id: 'nature', name: 'Nature'},
    {id: 'ocean', name: 'Ocean'},
    {id: 'sunset', name: 'Sunset'},
    {id: 'serene', name: 'Serene'},
    {id: 'autumn', name: 'Autumn'},
    {id: 'mint', name: 'Mint'},
  ];

  currentTheme!: Theme;
  currentMode!: Mode;
  private themeSubscription?: Subscription;
  private modeSubscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private modeService: ModeService
  ) {
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    this.modeSubscription = this.modeService.mode$.subscribe(mode => {
      this.currentMode = mode;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }

    if (this.modeSubscription) {
      this.modeSubscription.unsubscribe();
    }
  }

  setTheme(themeId: Theme): void {
    this.themeService.setTheme(themeId);
  }

  toggleMode(): void {
    this.modeService.toggleMode();
  }
}
